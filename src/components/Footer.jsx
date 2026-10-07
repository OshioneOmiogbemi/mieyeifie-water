import { useLanguage } from '../context/LanguageContext'
import './Footer.css'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>MIEYEIFIE</h3>
            <p>
              Delivering quality ozonized water and refreshing products across Bayelsa State and beyond.
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
            <h4>{t('contactUs')}</h4>
            <div className="contact-item">
              <span className="icon">📞</span>
              <a href="tel:+2348000000000">+234 800 000 0000</a>
            </div>
            <div className="contact-item">
              <span className="icon">📧</span>
              <a href="mailto:info@yourcompany.com">info@yourcompany.com</a>
            </div>
            <div className="contact-item">
              <span className="icon">📍</span>
              <span>Yenagoa, Bayelsa State</span>
            </div>
          </div>

          <div className="footer-social">
            <h4>{t('followUs')}</h4>
            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn">IG</a>
              <a href="https://wa.me/2348000000000" target="_blank" rel="noreferrer" className="social-btn">WA</a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="social-btn">TT</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} MIEYEIFIE. {t('allRights')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer