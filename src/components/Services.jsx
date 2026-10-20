const services = [
  {
    icon: '📦',
    title: 'Parcel Delivery',
    description:
      'Send parcels safely to your desired destination.',
  },
  {
    icon: '🏍️',
    title: 'Express Delivery',
    description:
      'Request fast delivery when your parcel needs to arrive quickly.',
  },
  {
    icon: '🚚',
    title: 'Door-to-Door',
    description:
      'We collect your parcel and deliver it directly to the recipient.',
  },
]

function Services() {
  return (
    <section
      id="services"
      className="services-section"
    >

      <div className="section-heading">

        <p className="eyebrow">
          OUR SERVICES
        </p>

        <h2>
          Courier services made simple
        </h2>

      </div>

      <div className="services-grid">

        {services.map((service) => (
          <div
            className="service-card"
            key={service.title}
          >

            <div className="service-icon">
              {service.icon}
            </div>

            <h3>
              {service.title}
            </h3>

            <p>
              {service.description}
            </p>

          </div>
        ))}

      </div>

    </section>
  )
}

export default Services