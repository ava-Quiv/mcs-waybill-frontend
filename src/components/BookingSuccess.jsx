import { downloadReceipt } from '../utils/receipt'

function BookingSuccess({
  formData,
  bookingNumber,
  onNewBooking,
}) {

  const handleDownload = () => {
    downloadReceipt(
      formData,
      bookingNumber
    )
  }

  return (
    <div className="success-message">

      <div className="success-icon">
        ✓
      </div>

      <h2>
        Delivery request received!
      </h2>

      <p>
        Thank you,{' '}
        <strong>
          {formData.name}
        </strong>.
      </p>

      <p>
        Your courier request from{' '}
        <strong>
          {formData.pickup}
        </strong>{' '}
        to{' '}
        <strong>
          {formData.destination}
        </strong>{' '}
        has been received.
      </p>

      <div className="booking-reference">

        <span>
          Booking Reference
        </span>

        <strong>
          {bookingNumber}
        </strong>

      </div>

      <p>
        Please download your receipt
        and keep the booking reference
        for your records.
      </p>

      <button
        type="button"
        className="download-button"
        onClick={handleDownload}
      >
        📄 Download Receipt
      </button>

      <button
        type="button"
        className="secondary-button"
        onClick={onNewBooking}
      >
        Send Another Parcel
      </button>

    </div>
  )
}

export default BookingSuccess