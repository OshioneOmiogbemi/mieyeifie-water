import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Hero.css'

import hero1 from '../assets/images/hero1.png'
import hero2 from '../assets/images/hero2.png'
import hero3 from '../assets/images/hero3.png'

const images = [hero1, hero2, hero3]

function Hero() {
  const [current, setCurrent] = useState(0)
  const { t } = useLanguage()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero" id="home">
      {images.map((img, index) => (
        <div
          key={index}
          className={index === current ? 'slide active' : 'slide'}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      <div className="hero-overlay" />

      <div className="hero-content">
        <h1>{t('welcome')}</h1>
        <p>{t('tagline')}</p>
      </div>
    </section>
  )
}

export default Hero