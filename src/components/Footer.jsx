import { useLanguage } from '../context/LanguageContext'
import './Footer.css'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">

          <div className="footer-brand">
            <h3>Mieyeifie Table Water Global Concepts</h3>
            <p>
              Mieyeifietablewater.com offers high-quality table water solutions with a commitment to purity and freshness. Your health is our priority.
            </p>
            <p className="nafdac">
              NAFDAC APPROVED<br />
              REG. NO.: A1-111095
            </p>
          </div>

          <div className="footer-links">
            <h4>{t('quickLinks')}</h4>
            <ul>
              <li><a href="#home">{t('home')}</a></li>
              <li><a href="#about">{t('about')}</a></li>
              <li><a href="#products">{t('products')}</a></li>
              <li><a href="#dealership">{t('becomeDealer')}</a></li>
              <li><a href="#contact">{t('contact')}</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <div className="contact-item">
              <span>Along Bayelsa Palm-Otuoke New Road, Yenagoa, Bayelsa State 569101</span>
            </div>
            <div className="contact-item">
              <span>Phone: </span>
              <a href="tel:+2349116525040">+234 911 652 5040</a>
            </div>
            <div className="contact-item">
              <span>Mobile: </span>
              <a href="tel:+2347070923134">+234 707 092 3134</a>
            </div>
            <div className="contact-item">
              <span>Email: </span>
              <a href="mailto:info@mieyeifietablewater.com">info@mieyeifietablewater.com</a>
            </div>
          </div>

          <div className="footer-social">
            <h4>Social media</h4>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn">FB</a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="social-btn">X</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn">IG</a>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Mieyeifie Table Water Global Concepts. {t('allRights')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer