import { useState } from 'react'

import {
  parcelTypes,
  weightOptions,
} from '../data/parcelOptions'

import {
  createBooking,
} from '../services/bookingservice'

import BookingSuccess from './BookingSuccess'


const initialFormData = {
  name: '',
  phone: '',
  email: '',
  pickup: '',
  destination: '',
  recipientName: '',
  recipientPhone: '',
  parcelType: '',
  weight: '',
  date: '',
  time: '',
  notes: '',
}


function BookingForm() {

  const [
    formData,
    setFormData,
  ] = useState(initialFormData)

  const [
    submitted,
    setSubmitted,
  ] = useState(false)

  const [
    bookingNumber,
    setBookingNumber,
  ] = useState('')

  const [
    loading,
    setLoading,
  ] = useState(false)

  const [
    error,
    setError,
  ] = useState('')


  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }


  const handleSubmit = async (event) => {

    event.preventDefault()

    setLoading(true)
    setError('')

    try {

      const data =
        await createBooking(formData)

      setBookingNumber(
        data.booking.bookingNumber
      )

      setSubmitted(true)

    } catch (error) {

      console.error(
        'Booking failed:',
        error
      )

      setError(
        error.message ||
        'Something went wrong. Please try again.'
      )

    } finally {

      setLoading(false)
    }
  }


  const makeAnotherBooking = () => {

    setFormData(
      initialFormData
    )

    setBookingNumber('')
    setSubmitted(false)
    setError('')
  }


  if (submitted) {

    return (
      <section
        id="booking"
        className="booking-section"
      >

        <div className="booking-container">

          <div className="booking-heading">

            <p className="eyebrow">
              BOOKING COMPLETE
            </p>

            <h2>
              Your courier request
            </h2>

          </div>

          <div className="booking-card">

            <BookingSuccess
              formData={formData}
              bookingNumber={bookingNumber}
              onNewBooking={
                makeAnotherBooking
              }
            />

          </div>

        </div>

      </section>
    )
  }


  return (
    <section
      id="booking"
      className="booking-section"
    >

      <div className="booking-container">

        <div className="booking-heading">

          <p className="eyebrow">
            BOOK A COURIER
          </p>

          <h2>
            Send your parcel
          </h2>

          <p>
            Enter your pickup, delivery and
            parcel information below.
          </p>

        </div>


        <div className="booking-card">

          {error && (

            <div className="error-message">
              {error}
            </div>

          )}


          <form
            onSubmit={handleSubmit}
          >

            {/* CUSTOMER */}

            <div className="form-section-title">

              <h3>
                Customer Details
              </h3>

              <p>
                Tell us who is requesting
                the delivery.
              </p>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label htmlFor="name">
                  Your Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="phone">
                  Your Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+254 712 345 678"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* PICKUP */}

            <div className="form-section-title">

              <h3>
                Pickup & Delivery
              </h3>

              <p>
                Where should we collect and
                deliver the parcel?
              </p>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label htmlFor="pickup">
                  Pickup Location
                </label>

                <input
                  id="pickup"
                  name="pickup"
                  type="text"
                  placeholder="e.g. Nairobi CBD"
                  value={formData.pickup}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="destination">
                  Delivery Location
                </label>

                <input
                  id="destination"
                  name="destination"
                  type="text"
                  placeholder="e.g. Kisii Town"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* RECIPIENT */}

            <div className="form-section-title">

              <h3>
                Recipient Details
              </h3>

              <p>
                Who will receive the parcel?
              </p>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label htmlFor="recipientName">
                  Recipient Name
                </label>

                <input
                  id="recipientName"
                  name="recipientName"
                  type="text"
                  placeholder="Recipient's full name"
                  value={formData.recipientName}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="recipientPhone">
                  Recipient Phone
                </label>

                <input
                  id="recipientPhone"
                  name="recipientPhone"
                  type="tel"
                  placeholder="+254 712 345 678"
                  value={formData.recipientPhone}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* PARCEL */}

            <div className="form-section-title">

              <h3>
                Parcel Details
              </h3>

              <p>
                Give us information about
                your parcel.
              </p>

            </div>


            <div className="form-grid">

              <div className="form-group">

                <label htmlFor="parcelType">
                  Parcel Type
                </label>

                <select
                  id="parcelType"
                  name="parcelType"
                  value={formData.parcelType}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select parcel type
                  </option>

                  {parcelTypes.map(
                    (type) => (
                      <option
                        key={type}
                        value={type}
                      >
                        {type}
                      </option>
                    )
                  )}

                </select>

              </div>


              <div className="form-group">

                <label htmlFor="weight">
                  Estimated Weight
                </label>

                <select
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select weight
                  </option>

                  {weightOptions.map(
                    (weight) => (
                      <option
                        key={weight}
                        value={weight}
                      >
                        {weight}
                      </option>
                    )
                  )}

                </select>

              </div>


              <div className="form-group">

                <label htmlFor="date">
                  Pickup Date
                </label>

                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="time">
                  Preferred Pickup Time
                </label>

                <input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* NOTES */}

            <div className="form-group">

              <label htmlFor="notes">
                Delivery Instructions
              </label>

              <textarea
                id="notes"
                name="notes"
                rows="5"
                placeholder="Any special instructions for the courier?"
                value={formData.notes}
                onChange={handleChange}
              />

            </div>


            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >

              {loading
                ? 'Submitting...'
                : 'Request Courier'}

            </button>

          </form>

        </div>

      </div>

    </section>
  )
}

export default BookingForm