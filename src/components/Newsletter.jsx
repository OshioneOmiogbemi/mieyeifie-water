import { useState, useEffect } from 'react'
import './Newsletter.css'

import news1 from '../assets/images/news1.png'   // replace with your images
import news2 from '../assets/images/news2.png'
import news3 from '../assets/images/hero3.png'

const slides = [
  {
    image: news1,
    title: 'SON Factory Inspection',
    text: 'on October 8, 2026, officials from the Standards Organisation of Nigeria (SON) visited our factory for a comprehensive quality inspection. We are proud to continue meeting the highest national standards for table water production.',
    date: 'October 8, 2026',
    side: 'left'
  },
  {
    image: news2,
    title: 'Mieyeifie Water at Bayelsa @ 30 Dinner',
    text: 'Our water was proudly served at the Bayelsa @ 30 anniversary dinner, which brought together top Bayelsa State officials, leaders, and other distinguished allies in celebration of the state’s 30th anniversary.',
    date: '2026',
    side: 'right'
  },
  {
   image: news3,
    title: 'Delivery to the Outskirts of Bayelsa',
    text: 'We now deliver our pure table water to the outskirts of Bayelsa State, ensuring communities beyond Yenagoa also enjoy quality, refreshing water.',
    date: '2026',
    side: 'left'
  }
]

function Newsletter() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="newsletter">
      <div className="newsletter-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`newsletter-slide ${slide.side}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="newsletter-overlay">
              <div className="newsletter-content">
                <span className="newsletter-date">{slide.date}</span>
                <h3>{slide.title}</h3>
                <p>{slide.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="newsletter-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={index === current ? 'dot active' : 'dot'}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Newsletter