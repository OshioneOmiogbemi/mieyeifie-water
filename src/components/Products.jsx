import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Products.css'

import product1 from '../assets/images/product1.png'
import product2 from '../assets/images/product2.png'

function Products() {
  const [selected, setSelected] = useState(null)
  const { t } = useLanguage()

  const products = [
    {
      id: 1,
      name: 'Sachet Water (Bags)',
      price: ' ₦500',
      image: product1,
      type: 'regular'
    },
    {
      id: 2,
      name: 'Bottled Water (Packs)',
      price: ' ₦1,500',
      image: product2,
      type: 'regular'
    },
    {
      id: 3,
      name: t('wholesale'),
      description: t('wholesaleText'),
      type: 'wholesale'
    }
  ]

  return (
    <section className="products" id="products">
      <div className="products-container">
        <h2>{t('ourProducts')}</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className={`product-card ${selected === product.id ? 'selected' : ''}`}
              onClick={() => setSelected(product.id)}
            >
              {product.type === 'regular' ? (
                <>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">{product.price} <span>{t('perItem')}</span></p>
                  </div>
                </>
              ) : (
                <div className="wholesale-content">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products