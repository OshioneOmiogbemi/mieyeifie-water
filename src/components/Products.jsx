import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Products.css'

import product1 from '../assets/images/product1.png'
import product2 from '../assets/images/product2.png'

function Products() {
  const [selected, setSelected] = useState(null)
  const [showOrder, setShowOrder] = useState(false)
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    quantity: 1,
    size: '75cl',
    address: '',
    notes: ''
  })

  const { t } = useLanguage()

  const products = [
    {
      id: 1,
      name: 'Sachet Water (Bags)',
      price: '₦300',
      image: product1,
      type: 'regular',
      badge: 'Popular'
    },
    {
      id: 2,
      name: 'Bottled Water (Packs)',
      price: [
        { size: '75cl', amount: 1900, unit: 'per pack' },
        { size: '50cl', amount: 1600, unit: 'per pack' },
        { size: '35cl', amount: 2900, unit: 'per pack (20 pcs)' }
      ],
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

  const selectedProduct = products.find((p) => p.id === selected)

  const handleCardClick = (product) => {
    setSelected(product.id)
    setOrderData((prev) => ({
      ...prev,
      size: '75cl',
      quantity: 1
    }))
    setShowOrder(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setOrderData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedProduct) return

    let message = ''

    if (selectedProduct.type === 'regular') {
      const selectedPrice = Array.isArray(selectedProduct.price)
        ? selectedProduct.price.find((item) => item.size === orderData.size)
        : null

      const price = selectedPrice
        ? `₦${selectedPrice.amount.toLocaleString()}`
        : selectedProduct.price

      // Clear label for 35cl
      const sizeLabel = selectedPrice
        ? selectedPrice.size === '35cl'
          ? '35cl (Pack of 20 pcs)'
          : selectedPrice.size
        : ''

      message = `Hello Mieyeifie!

I would like to place an order:

Product: ${selectedProduct.name}
${selectedPrice ? `Bottle Size: ${sizeLabel}\n` : ''}Price: ${price} ${selectedPrice?.unit || 'per item'}
Quantity: ${orderData.quantity}

Name: ${orderData.name}
Phone: ${orderData.phone}
Delivery Address: ${orderData.address}
Notes: ${orderData.notes || 'None'}`
    } else {
      message = `Hello Mieyeifie!

I am interested in wholesale supply:

Name: ${orderData.name}
Phone: ${orderData.phone}
Location / Address: ${orderData.address}
Estimated Quantity / Needs: ${orderData.quantity || 'Not specified'}
Additional Notes: ${orderData.notes || 'None'}`
    }

    const whatsappNumber = '2349116525040'
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank'
    )

    setOrderData({
      name: '',
      phone: '',
      quantity: 1,
      size: '75cl',
      address: '',
      notes: ''
    })
    setShowOrder(false)
    setSelected(null)
  }

  const closeOrder = () => {
    setShowOrder(false)
    setSelected(null)
  }

  const getCurrentPrice = () => {
    if (!selectedProduct || selectedProduct.type !== 'regular') return null
    if (Array.isArray(selectedProduct.price)) {
      const found = selectedProduct.price.find(
        (item) => item.size === orderData.size
      )
      return found ? found.amount : 0
    }
    return selectedProduct.price
  }

  const getCurrentUnit = () => {
    if (!selectedProduct || !Array.isArray(selectedProduct.price)) return 'per pack'
    const found = selectedProduct.price.find(
      (item) => item.size === orderData.size
    )
    return found?.unit || 'per pack'
  }

  return (
    <section className="products" id="products">
      <div className="products-container">
        <div className="products-header">
          <h2>{t('ourProducts')}</h2>
          <p className="products-subtitle">
            Choose the option that suits you best — retail packs or wholesale supply
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <article
              key={product.id}
              className={`product-card ${product.type} ${
                selected === product.id ? 'selected' : ''
              }`}
              onClick={() => handleCardClick(product)}
            >
              {product.type === 'regular' ? (
                <>
                  {product.badge && (
                    <span className="product-badge">{product.badge}</span>
                  )}

                  <div className="product-image-wrap">
                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className="product-body">
                    <h3>{product.name}</h3>

                    {Array.isArray(product.price) ? (
                      <div className="price-list">
                        {product.price.map((item) => (
                          <div className="price-row" key={item.size}>
                            <div className="size-info">
                              <span className="size">{item.size}</span>
                              {item.unit && (
                                <span className="unit">{item.unit}</span>
                              )}
                            </div>
                            <span className="amount">
                              ₦{item.amount.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="single-price">
                        <span className="amount">{product.price}</span>
                        <span className="per">{t('perItem')}</span>
                      </div>
                    )}

                    <button
                      className="order-trigger"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCardClick(product)
                      }}
                    >
                      Order Now
                    </button>
                  </div>
                </>
              ) : (
                <div className="wholesale-card">
                  <div className="wholesale-icon">📦</div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <button
                    className="order-trigger wholesale-btn"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCardClick(product)
                    }}
                  >
                    Request Quote
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Order Modal */}
        {showOrder && selectedProduct && (
          <div className="order-modal-overlay" onClick={closeOrder}>
            <div
              className="order-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="order-close"
                onClick={closeOrder}
                type="button"
              >
                ×
              </button>

              <div className="modal-header">
                <h3>
                  {selectedProduct.type === 'regular'
                    ? `Order ${selectedProduct.name}`
                    : 'Wholesale Inquiry'}
                </h3>
                {selectedProduct.type === 'regular' && (
                  <p className="modal-price">
                    {Array.isArray(selectedProduct.price) ? (
                      <>
                        ₦{getCurrentPrice()?.toLocaleString()}{' '}
                        <span>{getCurrentUnit()}</span>
                      </>
                    ) : (
                      <>
                        {selectedProduct.price} <span>each</span>
                      </>
                    )}
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="order-form">
                {selectedProduct.type === 'regular' &&
                  Array.isArray(selectedProduct.price) && (
                    <div className="form-group">
                      <label>Bottle Size</label>
                      <div className="size-options">
                        {selectedProduct.price.map((item) => (
                          <label
                            key={item.size}
                            className={`size-option ${
                              orderData.size === item.size ? 'active' : ''
                            }`}
                          >
                            <input
                              type="radio"
                              name="size"
                              value={item.size}
                              checked={orderData.size === item.size}
                              onChange={handleChange}
                            />
                            <span className="size-label">{item.size}</span>
                            <span className="size-price">
                              ₦{item.amount.toLocaleString()}
                              {item.size === '35cl' && (
                                <small>20 pcs</small>
                              )}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={orderData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="e.g. 08012345678"
                      value={orderData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">
                    {selectedProduct.type === 'regular'
                      ? 'Quantity'
                      : 'Estimated Quantity / Needs'}
                  </label>
                  {selectedProduct.type === 'regular' ? (
                    <input
                      id="quantity"
                      type="number"
                      name="quantity"
                      min="1"
                      value={orderData.quantity}
                      onChange={handleChange}
                      required
                    />
                  ) : (
                    <input
                      id="quantity"
                      type="text"
                      name="quantity"
                      placeholder="e.g. 50 bags weekly"
                      value={orderData.quantity}
                      onChange={handleChange}
                    />
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="address">
                    {selectedProduct.type === 'regular'
                      ? 'Delivery Address'
                      : 'Business Location / Address'}
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    placeholder={
                      selectedProduct.type === 'regular'
                        ? 'Street, area, city...'
                        : 'Business address or delivery area'
                    }
                    rows="3"
                    value={orderData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="notes">Additional Notes (optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Any special instructions..."
                    rows="2"
                    value={orderData.notes}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="submit-btn">
                  {selectedProduct.type === 'regular'
                    ? 'Place Order via WhatsApp'
                    : 'Send Wholesale Inquiry'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Products