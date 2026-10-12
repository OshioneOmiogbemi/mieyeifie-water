import './BusinessHours.css'

function BusinessHours() {
  const hours = [
    { day: 'MONDAY', time: '8:00 AM - 6:00 PM' },
    { day: 'TUESDAY', time: '8:00 AM - 6:00 PM' },
    { day: 'WEDNESDAY', time: '8:00 AM - 6:00 PM' },
    { day: 'THURSDAY', time: '8:00 AM - 6:00 PM' },
    { day: 'FRIDAY', time: '8:00 AM - 6:00 PM' },
    { day: 'SATURDAY', time: '10:00 AM - 4:00 PM' },
    { day: 'SUNDAY', time: 'Closed' }
  ]

  return (
    <section className="business-hours">
      <div className="business-hours-container">
        <div className="hours-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>

        <div className="hours-list">
          {hours.map((item) => (
            <div key={item.day} className="hours-item">
              <span className="hours-day">{item.day}</span>
              <span className={`hours-time ${item.time === 'Closed' ? 'closed' : ''}`}>
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BusinessHours