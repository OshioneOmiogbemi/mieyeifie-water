import { useLanguage } from '../context/LanguageContext'
import './Hero.css'

import heroVideo from '../assets/images/mieyeifiead.mp4'

function Hero() {
  const { t } = useLanguage()

  return (
    <section className="hero" id="home">
      {/* Backdrop: same video, blurred, fills the screen */}
      <video
        className="hero-bg-video"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      <div className="hero-overlay" />

      <div className="hero-inner">
        <div className="hero-content">
          <h1>{t('welcome')}</h1>
          <p>{t('tagline')}</p>
        </div>

        {/* Sharp, uncropped vertical video (desktop/landscape only) */}
        <div className="hero-video-frame">
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero