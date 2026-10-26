
import { useMemo, useState } from "react";
import "./App.css";
import { downloadBookingReceipt } from "./utils/receipt";

const API_URL = " https://mcs-waybill-backend-2.onrender.com/api/bookings";

const INITIAL_FORM_DATA = {
  senderName: "",
  senderPhone: "",
  senderEmail: "",
  senderId: "",
  pickupAddress: "",
  destination: "",
  recipientName: "",
  recipientPhone: "",
  recipientId: "",
  parcelType: "Documents",
  weight: "Below 1 kg",
  description: "",
  pickupDate: "",
  pickupTime: "",
  notes: "",
  paymentMethod: "M-Pesa",
};

const DELIVERY_FEES = {
  "Below 1 kg": 250,
  "1 - 5 kg": 450,
  "5 - 10 kg": 750,
  "10 - 20 kg": 1200,
  "Above 20 kg": 2000,
};

function formatCurrency(amount) {
  return `KSh ${Number(amount || 0).toLocaleString("en-KE")}`;
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
  min,
  maxLength,
  autoComplete,
}) {
  return (
    <div className="form-field">
      <label htmlFor={name}>
        {label}
        {required && <span className="required"> *</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        min={min}
        maxLength={maxLength}
        autoComplete={autoComplete}
      />
    </div>
  );
}

function Section({ title, description, children }) {
  return (
    <section className="form-section">
      <div className="section-heading">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>

      <div className="form-grid">{children}</div>
    </section>
  );
}

export default function App() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState(null);
  const [errorResponse, setErrorResponse] = useState("");
  const [receiptError, setReceiptError] = useState("");

  const deliveryFee = useMemo(
    () => DELIVERY_FEES[formData.weight] ?? 0,
    [formData.weight]
  );

  const today = new Date();
  const minPickupDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear old messages when the customer edits the form.
    setErrorResponse("");
    setReceiptError("");
  }

  function getSavedBooking(result) {
    // Support common API response formats.
    return (
      result?.booking ||
      result?.data?.booking ||
      result?.data ||
      result
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorResponse("");
    setReceiptError("");
    setSuccessResponse(null);

    if (!deliveryFee) {
      setErrorResponse("Please select a valid parcel weight.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        deliveryFee,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message ||
            result.error ||
            `Booking failed. Server returned ${response.status}.`
        );
      }

      const savedBooking = getSavedBooking(result);

      if (
        !savedBooking ||
        typeof savedBooking !== "object" ||
        (!savedBooking.bookingNumber && !savedBooking._id)
      ) {
        throw new Error(
          "The server responded, but the saved booking details were not returned. Check your backend POST response."
        );
      }

      // Preserve the saved record so the receipt button remains available.
      setSuccessResponse(savedBooking);

      // Clear the form only after the backend confirms success.
      setFormData({ ...INITIAL_FORM_DATA });

      // Automatically download the receipt.
      try {
        downloadBookingReceipt(savedBooking);
      } catch (pdfError) {
        console.error("Receipt generation failed:", pdfError);

        setReceiptError(
          "Your booking was saved, but the PDF could not be generated automatically. Use the download button below to try again."
        );
      }
    } catch (error) {
      console.error("Booking submission failed:", error);

      setErrorResponse(
        error.message ||
          "Unable to submit your booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleDownloadReceipt() {
    try {
      setReceiptError("");
      downloadBookingReceipt(successResponse);
    } catch (error) {
      console.error("Receipt download failed:", error);

      setReceiptError(
        "The receipt could not be generated. Please refresh the page and try again."
      );
    }
  }

  return (
    <div className="app">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="MCS Waybill Hub home">
          <span className="brand-icon" aria-hidden="true">
            MCS
          </span>

          <span className="brand-copy">
            <strong>MCS Waybill Hub</strong>
            <small>Reliable courier services</small>
          </span>
        </a>

        <a className="header-contact" href="#contact">
          Contact us
        </a>
      </header>

      <main id="home">
        <section className="hero">
          <span className="eyebrow">COURIER BOOKING</span>

          <h1>Send your parcel with confidence.</h1>

          <p>
            Enter your details below to arrange your parcel pickup.
            Once your booking is saved, you can download your booking
            receipt as a PDF.
          </p>
        </section>

        <div className="booking-layout">
          <form className="booking-card" onSubmit={handleSubmit}>
            <div className="booking-card-heading">
              <div>
                <h2>Book a delivery</h2>
                <p>Fields marked with * are required.</p>
              </div>

              <span className="secure-label">
                Booking form
              </span>
            </div>

            {errorResponse && (
              <div className="alert alert-error" role="alert">
                <strong>Booking unsuccessful</strong>
                <p>{errorResponse}</p>
              </div>
            )}

            {successResponse && (
              <div className="alert alert-success" role="status">
                <strong>Booking successfully saved!</strong>

                <p>
                  Your booking number is{" "}
                  <strong>
                    {successResponse.bookingNumber || successResponse._id}
                  </strong>
                  .
                </p>

                <p>
                  Keep this number for future reference. Your receipt
                  is available below.
                </p>

                <button
                  className="button button-download"
                  type="button"
                  onClick={handleDownloadReceipt}
                >
                  Download Booking Receipt (PDF)
                </button>
              </div>
            )}

            {receiptError && (
              <div className="alert alert-warning" role="alert">
                {receiptError}
              </div>
            )}

            <Section
              title="1. Sender details"
              description="Enter the details of the person sending the parcel."
            >
              <Field
                label="Full name"
                name="senderName"
                value={formData.senderName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                autoComplete="name"
                maxLength={100}
              />

              <Field
                label="Phone number"
                name="senderPhone"
                value={formData.senderPhone}
                onChange={handleChange}
                required
                placeholder="e.g. 0712345678"
                type="tel"
                autoComplete="tel"
                maxLength={15}
              />

              <Field
                label="Email address"
                name="senderEmail"
                value={formData.senderEmail}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
              />

              <Field
                label="ID number"
                name="senderId"
                value={formData.senderId}
                onChange={handleChange}
                required
                placeholder="Enter sender ID number"
                maxLength={30}
              />

              <div className="form-field full-width">
                <label htmlFor="pickupAddress">
                  Pickup address <span className="required">*</span>
                </label>

                <textarea
                  id="pickupAddress"
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  required
                  rows={3}
                  maxLength={300}
                  placeholder="County, town, estate, building or landmark"
                />
              </div>
            </Section>

            <Section
              title="2. Recipient details"
              description="Tell us who will receive the parcel."
            >
              <Field
                label="Recipient's full name"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                required
                placeholder="Enter recipient's full name"
                maxLength={100}
              />

              <Field
                label="Recipient's phone number"
                name="recipientPhone"
                value={formData.recipientPhone}
                onChange={handleChange}
                required
                type="tel"
                placeholder="e.g. 0712345678"
                maxLength={15}
              />

              <Field
                label="Recipient's ID number"
                name="recipientId"
                value={formData.recipientId}
                onChange={handleChange}
                required
                placeholder="Enter recipient's ID number"
                maxLength={30}
              />

              <Field
                label="Destination address"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                placeholder="Town, county, estate or landmark"
                maxLength={300}
              />
            </Section>

            <Section
              title="3. Parcel details"
              description="Describe the parcel so we can estimate the delivery fee."
            >
              <div className="form-field">
                <label htmlFor="parcelType">
                  Parcel type <span className="required">*</span>
                </label>

                <select
                  id="parcelType"
                  name="parcelType"
                  value={formData.parcelType}
                  onChange={handleChange}
                  required
                >
                  <option value="Documents">Documents</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Food items">Food items</option>
                  <option value="Household items">Household items</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="weight">
                  Parcel weight <span className="required">*</span>
                </label>

                <select
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                >
                  {Object.keys(DELIVERY_FEES).map((weight) => (
                    <option key={weight} value={weight}>
                      {weight}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field full-width">
                <label htmlFor="description">
                  Parcel description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  maxLength={500}
                  placeholder="Describe the contents of your parcel"
                />
              </div>

              <div className="form-field full-width">
                <label htmlFor="notes">
                  Additional instructions
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  maxLength={500}
                  placeholder="e.g. Fragile, please handle with care"
                />
              </div>
            </Section>

            <Section
              title="4. Pickup schedule"
              description="Choose your preferred pickup date and time."
            >
              <Field
                label="Pickup date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                type="date"
                min={minPickupDate}
                required
              />

              <Field
                label="Pickup time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                type="time"
                required
              />
            </Section>

            <Section
              title="5. Payment details"
              description="Select the intended payment method."
            >
              <div className="form-field full-width">
                <label htmlFor="paymentMethod">
                  Payment method
                </label>

                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="M-Pesa">M-Pesa</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
            </Section>

            <div className="form-actions">
              <p className="form-note">
                Please check your details before submitting.
              </p>

              <button
                className="button button-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving booking..." : "Confirm Booking"}
              </button>
            </div>
          </form>

          <aside className="summary-card">
            <span className="summary-kicker">YOUR ESTIMATE</span>

            <h2>Delivery summary</h2>

            <div className="summary-row">
              <span>Parcel type</span>
              <strong>{formData.parcelType || "Not selected"}</strong>
            </div>

            <div className="summary-row">
              <span>Weight range</span>
              <strong>{formData.weight}</strong>
            </div>

            <div className="summary-total">
              <span>Estimated delivery fee</span>
              <strong>{formatCurrency(deliveryFee)}</strong>
            </div>

            <p className="summary-disclaimer">
              This is the estimated fee based on the selected weight
              range. Confirm any additional charges with the courier.
              Booking does not mean payment has been received.
            </p>

            <div className="summary-help">
              <strong>Need help?</strong>
              <p>
                Contact our team if you need assistance with your
                booking or parcel details.
              </p>
              <a href="#contact">Contact information</a>
            </div>
          </aside>
        </div>
      </main>

      <footer className="site-footer" id="contact">
        <div>
          <strong>MCS Waybill Hub</strong>
          <p>Reliable courier services for your parcels.</p>
        </div>

        <div>
          <strong>Contact us</strong>
          <p>Contact your courier team for delivery assistance.</p>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} MCS Waybill Hub. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
