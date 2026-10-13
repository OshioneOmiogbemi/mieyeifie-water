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
      price: '₦500',
      image: product1,
      type: 'regular'
    },
    {
      id: 2,
      name: 'Bottled Water (Packs)',
      price: [
        { size: '75cl', amount: 2700 },
        { size: '50cl', amount: 2500 }
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
        ? selectedProduct.price.find(
            (item) => item.size === orderData.size
          )
        : null

      const price = selectedPrice
        ? `₦${selectedPrice.amount.toLocaleString()}`
        : selectedProduct.price

      message = `Hello Mieyeifie!

I would like to place an order:

Product: ${selectedProduct.name}
${selectedPrice ? `Bottle Size: ${selectedPrice.size}\n` : ''}Price: ${price} per item
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

  return (
    <section className="products" id="products">
      <div className="products-container">
        <h2>{t('ourProducts')}</h2>

        <div className="products-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className={`product-card ${
                selected === product.id ? 'selected' : ''
              }`}
              onClick={() => handleCardClick(product)}
            >
              {product.type === 'regular' ? (
                <>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className="product-info">
                    <h3>{product.name}</h3>

                    {Array.isArray(product.price) ? (
                      <div className="product-prices">
                        {product.price.map((item) => (
                          <div
                            className="product-price-item"
                            key={item.size}
                          >
                            <span className="product-size">
                              {item.size}
                            </span>

                            <p className="price">
                              ₦{item.amount.toLocaleString()}
                              <span>{t('perItem')}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="price">
                        {product.price}{' '}
                        <span>{t('perItem')}</span>
                      </p>
                    )}
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

        {showOrder && selectedProduct && (
          <div
            className="order-modal-overlay"
            onClick={closeOrder}
          >
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

              <h3>
                {selectedProduct.type === 'regular'
                  ? `Order ${selectedProduct.name}`
                  : 'Wholesale Inquiry'}
              </h3>

              {selectedProduct.type === 'regular' && (
                <>
                  {Array.isArray(selectedProduct.price) ? (
                    <>
                      <div className="form-group">
                        <label htmlFor="size">
                          Select Bottle Size
                        </label>

                        <select
                          id="size"
                          name="size"
                          value={orderData.size}
                          onChange={handleChange}
                          required
                        >
                          {selectedProduct.price.map((item) => (
                            <option
                              key={item.size}
                              value={item.size}
                            >
                              {item.size} - ₦
                              {item.amount.toLocaleString()}
                            </option>
                          ))}
                        </select>
                      </div>

                      <p className="order-price">
                        ₦
                        {(
                          selectedProduct.price.find(
                            (item) =>
                              item.size === orderData.size
                          )?.amount || 0
                        ).toLocaleString()}{' '}
                        each
                      </p>
                    </>
                  ) : (
                    <p className="order-price">
                      {selectedProduct.price} each
                    </p>
                  )}
                </>
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