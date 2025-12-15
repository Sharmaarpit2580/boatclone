import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Banner from '../../components/banner/Banner'
import Footer from '../../components/footer/Footer.jsx'
import ProductList, { productsData } from '../../components/productlist/ProductList'
import { useFilter } from '../../components/filter/FilterContext'
export default function Home() {
  const navigate = useNavigate()
  const { setFilter, clearFilter } = useFilter()

  const handleProductClick = (product) => {
    clearFilter()
    setFilter('category', product.category)
    navigate('/products')
  }

  const sections = [
    { title: 'Earbuds', category: 'earbuds' },
    { title: 'Headphones', category: 'headphones' },
    { title: 'Smartwatches', category: 'smartwatch' },
    { title: 'Speakers', category: 'speaker' },
  ]

  return (
    <div>
        <Navbar />
        <Banner />
        {sections.map(section => (
          <section key={section.category} style={{ padding: '1rem clamp(1rem, 4vw, 3rem)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h2 style={{ margin: 0 }}>{section.title}</h2>
              <button
                onClick={() => {
                  clearFilter()
                  setFilter('category', section.category)
                  navigate('/products')
                }}
                style={{
                  background: 'transparent',
                  border: '1px solid #1f1f1f',
                  color: '#f5f5f5',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                View all
              </button>
            </div>
            <ProductList
              products={productsData.filter(p => p.category === section.category).slice(0, 4)}
              onProductClick={handleProductClick}
              onAddToCart={() => {}}
              ctaLabel="Add to cart"
            />
          </section>
        ))}
        <Footer />
    </div>
  )
}
