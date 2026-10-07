import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Dealership.css'

function Dealership() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    experience: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Dealer application:', formData)
    alert('Application submitted successfully! We will contact you soon.')
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      location: '',
      experience: '',
      message: ''
    })
  }

  return (
    <section className="dealership" id="dealership">
      <div className="dealership-container">
        <h2>{t('becomeDealer')}</h2>

        <div className="dealership-grid">
          <div className="info-card">
            <h3>{t('requirements')}</h3>
            <ul>
              <li>{t('req1')}</li>
              <li>{t('req2')}</li>
              <li>{t('req3')}</li>
              <li>{t('req4')}</li>
              <li>{t('req5')}</li>
              <li>{t('req6')}</li>
            </ul>

            <h3>{t('benefits')}</h3>
            <ul>
              <li>{t('ben1')}</li>
              <li>{t('ben2')}</li>
              <li>{t('ben3')}</li>
              <li>{t('ben4')}</li>
              <li>{t('ben5')}</li>
            </ul>
          </div>

          <div className="form-card">
            <h3>{t('dealerApplication')}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="fullName"
                  placeholder={t('fullName')}
                  value={formData.fullName}
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
                  type="text"
                  name="location"
                  placeholder={t('businessLocation')}
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="experience"
                  placeholder={t('yearsExperience')}
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder={t('aboutYourself')}
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                {t('submitApplication')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dealership