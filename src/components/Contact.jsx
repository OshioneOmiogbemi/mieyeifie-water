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
    console.log('Contact form:', formData)
    alert('Message sent successfully! We will get back to you soon.')
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
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-item">
                <span className="social-icon">IG</span>
                <span>Instagram</span>
              </a>

              <a href="https://wa.me/2348000000000" target="_blank" rel="noreferrer" className="social-item">
                <span className="social-icon">WA</span>
                <span>WhatsApp</span>
              </a>

              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="social-item">
                <span className="social-icon">TT</span>
                <span>TikTok</span>
              </a>
            </div>

            <div className="phone-box">
              <p>{t('callUs')}</p>
              <a href="tel:+2348000000000">+234 800 000 0000</a>
            </div>
          </div>

          <div className="map-card">
            <h3>{t('ourLocations')}</h3>
            <div className="map-wrapper">
              <iframe
                title="Company Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.309!2d6.270!3d4.926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNTUnMzMuNiJOIDbCsDE2JzEyLjAiRQ!5e0!3m2!1sen!2sng!4v1710000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="map-note">{t('factoryOutlet')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact