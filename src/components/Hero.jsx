function Hero() {
  return (
    <section
      id="home"
      className="hero-section"
    >

      <div className="hero-content">

        <p className="eyebrow">
          FAST • SAFE • RELIABLE
        </p>

        <h1>
          Send your parcel
          <span>
            with confidence.
          </span>
        </h1>

        <p className="hero-text">
          Moracha Courier Services makes it easy
          to send parcels from one location to
          another. Book a courier pickup today.
        </p>

        <a
          href="#booking"
          className="hero-button"
        >
          Send a Parcel
        </a>

      </div>

      <div className="hero-card">

        <div className="delivery-icon">
          📦
        </div>

        <h3>
          Reliable Delivery
        </h3>

        <p>
          We help you move your parcels safely
          and conveniently from pickup to
          destination.
        </p>

        <div className="delivery-route">

          <span>
            📍 Pickup
          </span>

          <span>
            →
          </span>

          <span>
            🏠 Delivery
          </span>

        </div>

      </div>

    </section>
  )
}

export default Hero