import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Contact.css'

function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const message = `Hello Mieyeifie!%0A%0A*New Contact Message*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone || 'Not provided'}%0A*Subject:* ${formData.subject || 'No subject'}%0A%0A*Message:*%0A${formData.message}`

    const whatsappNumber = '2349116525040'
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <h2>{t('contactUs')}</h2>

        <div className="contact-grid">
          <div className="contact-form-card">
            <h3>{t('sendMessage')}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder={t('yourName')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder={t('emailAddress')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder={t('phoneNumber')}
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder={t('subject')}
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder={t('yourMessage')}
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                {t('sendMessage')}
              </button>
            </form>
          </div>

          <div className="social-card">
            <h3>{t('connectWithUs')}</h3>

            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-item">
                <span className="social-icon">FB</span>
                <span>Facebook</span>
              </a>

              <a href="https://x.com" target="_blank" rel="noreferrer" className="social-item">
                <span className="social-icon">X</span>
                <span>X</span>
              </a>

              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-item">
                <span className="social-icon">IG</span>
                <span>Instagram</span>
              </a>
            </div>

            <div className="phone-box">
              <p>{t('callUs')}</p>
              <a href="tel:+2349116525040">+234 911 652 5040</a>
              <br />
              <a href="tel:+2347070923134">+234 707 092 3134</a>
            </div>
          </div>

          <div className="map-card">
            <h3>{t('ourLocations')}</h3>
            <div className="map-wrapper">
              <iframe
                title="Mieyeifie Table Water Location"
                src="https://maps.google.com/maps?q=Bayelsa+Palm-Otuoke+New+Road,+Yenagoa,+Bayelsa+State,+Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="map-note">
              Along Bayelsa Palm-Otuoke New Road, Yenagoa, Bayelsa State 569101
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact