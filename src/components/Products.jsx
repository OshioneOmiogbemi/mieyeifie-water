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
    address: '',
    notes: ''
  })

  const { t } = useLanguage()

  const products = [
    {
      id: 1,
      name: 'Sachet Water (Bags)',
      price: '₦500',
      image: product1,
      type: 'regular'
    },
    {
      id: 2,
      name: 'Bottled Water (Packs)',
      price: '₦1,500',
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
    setShowOrder(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setOrderData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!selectedProduct) return

    let message = ''

    if (selectedProduct.type === 'regular') {
      message = `Hello Mieyeifie!%0A%0AI would like to place an order:%0A%0A*Product:* ${selectedProduct.name}%0A*Price:* ${selectedProduct.price}%0A*Quantity:* ${orderData.quantity}%0A%0A*Name:* ${orderData.name}%0A*Phone:* ${orderData.phone}%0A*Delivery Address:* ${orderData.address}%0A*Notes:* ${orderData.notes || 'None'}`
    } else {
      message = `Hello Mieyeifie!%0A%0AI am interested in wholesale supply:%0A%0A*Name:* ${orderData.name}%0A*Phone:* ${orderData.phone}%0A*Location / Address:* ${orderData.address}%0A*Estimated Quantity / Needs:* ${orderData.quantity || 'Not specified'}%0A*Additional Notes:* ${orderData.notes || 'None'}`
    }

    const whatsappNumber = '2349116525040'
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')

    setOrderData({
      name: '',
      phone: '',
      quantity: 1,
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

  return (
    <section className="products" id="products">
      <div className="products-container">
        <h2>{t('ourProducts')}</h2>

        <div className="products-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className={`product-card ${selected === product.id ? 'selected' : ''}`}
              onClick={() => handleCardClick(product)}
            >
              {product.type === 'regular' ? (
                <>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">
                      {product.price} <span>{t('perItem')}</span>
                    </p>
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

        {/* Order / Inquiry Modal */}
        {showOrder && selectedProduct && (
          <div className="order-modal-overlay" onClick={closeOrder}>
            <div className="order-modal" onClick={(e) => e.stopPropagation()}>
              <button className="order-close" onClick={closeOrder}>
                ×
              </button>

              <h3>
                {selectedProduct.type === 'regular'
                  ? `Order ${selectedProduct.name}`
                  : 'Wholesale Inquiry'}
              </h3>

              {selectedProduct.type === 'regular' && (
                <p className="order-price">{selectedProduct.price} each</p>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={orderData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={orderData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {selectedProduct.type === 'regular' ? (
                  <div className="form-group">
                    <input
                      type="number"
                      name="quantity"
                      placeholder="Quantity"
                      min="1"
                      value={orderData.quantity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ) : (
                  <div className="form-group">
                    <input
                      type="text"
                      name="quantity"
                      placeholder="Estimated Quantity / Needs"
                      value={orderData.quantity}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="form-group">
                  <textarea
                    name="address"
                    placeholder={
                      selectedProduct.type === 'regular'
                        ? 'Delivery Address'
                        : 'Business Location / Address'
                    }
                    rows="3"
                    value={orderData.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <textarea
                    name="notes"
                    placeholder="Additional Notes (optional)"
                    rows="2"
                    value={orderData.notes}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  {selectedProduct.type === 'regular'
                    ? 'Place Order via WhatsApp'
                    : 'Send Wholesale Inquiry via WhatsApp'}
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