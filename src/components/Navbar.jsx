import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [openLang, setOpenLang] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const changeLanguage = (lang) => {
    setLanguage(lang)
    setOpenLang(false)
  }

  const closeMenu = () => {
    setMenuOpen(false)
    setOpenLang(false)
  }

  const langLabel = {
    en: 'EN',
    ij: 'IJ',
    fr: 'FR'
  }

  return (
    <nav className={scrolled ? 'navbar scrolled' : 'navbar'}>
      <div className="navbar-container">

        {/* Logo */}
        <div className="logo">
          <a href="#home" onClick={closeMenu}>
            MIEYEIFIE
          </a>
        </div>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          <li>
            <a href="#home">{t('home')}</a>
          </li>

          <li>
            <a href="#about">{t('about')}</a>
          </li>

          <li>
            <a href="#products">{t('products')}</a>
          </li>

          <li>
            <a href="#contact">{t('contact')}</a>
          </li>
        </ul>

        {/* Language Selector */}
        <div className="lang-wrapper">
          <button
            className="lang-btn"
            onClick={() => setOpenLang(!openLang)}
          >
            {langLabel[language]}
          </button>

          {openLang && (
            <div className="lang-dropdown">
              <button onClick={() => changeLanguage('en')}>
                English
              </button>

              <button onClick={() => changeLanguage('ij')}>
                Ijaw
              </button>

              <button onClick={() => changeLanguage('fr')}>
                Français
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#home" onClick={closeMenu}>
          {t('home')}
        </a>

        <a href="#about" onClick={closeMenu}>
          {t('about')}
        </a>

        <a href="#products" onClick={closeMenu}>
          {t('products')}
        </a>

        <a href="#contact" onClick={closeMenu}>
          {t('contact')}
        </a>

        {/* Mobile Language Selector */}
        <div className="mobile-language">
          <span>Language</span>

          <div className="mobile-language-buttons">
            <button
              className={language === 'en' ? 'active-lang' : ''}
              onClick={() => changeLanguage('en')}
            >
              EN
            </button>

            <button
              className={language === 'ij' ? 'active-lang' : ''}
              onClick={() => changeLanguage('ij')}
            >
              IJ
            </button>

            <button
              className={language === 'fr' ? 'active-lang' : ''}
              onClick={() => changeLanguage('fr')}
            >
              FR
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar