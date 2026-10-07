import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './About.css'

import about1 from '../assets/images/about1.png'
import about2 from '../assets/images/about2.png'

function About() {
  const sectionRef = useRef(null)
  const { t } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
          }
        })
      },
      { threshold: 0.2 }
    )

    const elements = sectionRef.current.querySelectorAll('.about-block, .about-heading')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-container">
        <h2 className="about-heading">{t('aboutUs')}</h2>

        <div className="about-block">
          <div className="about-image-wrapper left">
            <div className="image-bg"></div>
            <img
               src={about1}
               alt="Our team"
             />
          </div>
          <div className="about-text">
            <h3>{t('whoWeAre')}</h3>
            <p>{t('whoWeAreText1')}</p>
            <p>{t('whoWeAreText2')}</p>
          </div>
        </div>

        <div className="about-block reverse">
          <div className="about-image-wrapper right">
            <div className="image-bg"></div>
            <img
              src={about2}
              alt="Our workspace"
            />
          </div>
          <div className="about-text">
            <h3>{t('ourMission')}</h3>
            <p>{t('ourMissionText1')}</p>
            <p>{t('ourMissionText2')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About