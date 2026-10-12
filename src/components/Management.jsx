import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Management.css'

import ceo from '../assets/images/img1.png'
import coo from '../assets/images/img2.png'
import cfo from '../assets/images/img3.png'
import marketing from '../assets/images/about1.png'
import operations from '../assets/images/about2.png'

const team = [
  {
    name: 'Stephen Vianana',
    position: 'General Manager',
    image: ceo
  },
  {
    name: 'Graham David',
    position: 'Quality Control Officer',
    image: coo
  },
  {
    name: 'Benjamin Ayebabomo',
    position: 'Production Manager',
    image: cfo
  },
  {
    name: 'Dorcas Godgift',
    position: 'Sales Representative',
    image: marketing
  },
  {
    name: 'Tamar',
    position: 'Sales Representative',
    image: operations
  }
]

const desktopCardWidth = 300
const desktopGap = 40
const desktopTotalCard = desktopCardWidth + desktopGap

function Management() {
  const [current, setCurrent] = useState(team.length)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [cardWidth, setCardWidth] = useState(desktopCardWidth)
  const [gap, setGap] = useState(desktopGap)

  const { t } = useLanguage()

  const extendedTeam = [...team, ...team, ...team]

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth <= 400) {
        setCardWidth(240)
        setGap(20)
      } else if (window.innerWidth <= 768) {
        setCardWidth(270)
        setGap(25)
      } else {
        setCardWidth(desktopCardWidth)
        setGap(desktopGap)
      }
    }

    updateSize()

    window.addEventListener('resize', updateSize)

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const totalCard = cardWidth + gap

  const prev = () => {
    setIsTransitioning(true)
    setCurrent((prev) => prev - 1)
  }

  const next = () => {
    setIsTransitioning(true)
    setCurrent((prev) => prev + 1)
  }

  useEffect(() => {
    if (current <= team.length - 1) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        setCurrent(current + team.length)
      }, 650)

      return () => clearTimeout(timer)
    }

    if (current >= team.length * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false)
        setCurrent(current - team.length)
      }, 650)

      return () => clearTimeout(timer)
    }
  }, [current])

  return (
    <section className="management" id="management">
      <div className="management-container">

        <h2>{t('meetManagement')}</h2>

        <div className="carousel">

          <button className="nav-btn prev" onClick={prev}>
            ‹
          </button>

          <div className="viewport">
            <div
              className="track"
              style={{
                transform: `translateX(calc(50% - ${cardWidth / 2}px - ${current * totalCard}px))`,
                transition: isTransitioning
                  ? 'transform 0.65s cubic-bezier(0.25, 0.8, 0.25, 1)'
                  : 'none'
              }}
            >
              {extendedTeam.map((member, index) => {
                const offset = Math.abs(index - current)
                const isActive = index === current
                const isSide = offset === 1

                return (
                  <div
                    key={index}
                    className={`card ${isActive ? 'active' : ''} ${isSide ? 'side' : ''} ${offset > 1 ? 'far' : ''}`}
                    style={{
                      width: `${cardWidth}px`,
                      marginRight: `${gap}px`
                    }}
                  >
                    <img src={member.image} alt={member.name} />

                    <div className="card-info">
                      <h3>{member.name}</h3>
                      <p>{member.position}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <button className="nav-btn next" onClick={next}>
            ›
          </button>

        </div>
      </div>
    </section>
  )
}

export default Management