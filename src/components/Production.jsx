import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Production.css'

function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true)
      },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * end))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(end)
    }
    requestAnimationFrame(step)
  }, [started, end, duration])

  return <h3 ref={ref}>{count.toLocaleString()}{suffix}</h3>
}

function Production() {
  const { t } = useLanguage()

  return (
    <section className="production" id="production">
      <div className="production-bg">
        <div className="sliding-image"></div>
        <div className="sliding-image"></div>
      </div>
      <div className="production-overlay">
        <div className="production-content">
          <div className="stat-block">
            <Counter end={2000} suffix="+" />
            <p>{t('bagsProduced')}</p>
          </div>
          <div className="stat-block">
            <Counter end={200} suffix="+" />
            <p>{t('packsProduced')}</p>
          </div>
          <div className="stat-block">
            <Counter end={70} suffix="%" />
            <p>{t('deliveryCoverage')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Production