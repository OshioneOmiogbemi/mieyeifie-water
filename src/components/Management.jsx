import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Management.css'

const team = [
  {
    name: 'John Anderson',
    position: 'Chief Executive Officer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Sarah Mitchell',
    position: 'Chief Operating Officer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Michael Rivera',
    position: 'Chief Financial Officer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Emily Carter',
    position: 'Head of Marketing',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'David Thompson',
    position: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80'
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