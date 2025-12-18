import React from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../../components/navbar/Navbar'
import Banner from '../../components/banner/Banner'
import Footer from '../../components/footer/Footer'
import ProductList, { productsData } from '../../components/productlist/ProductList'
import { useCart } from '../../components/cart/CartContext'
import { useAuth } from '../../components/auth/AuthContext'
import styles from './Home.module.css'

export default function Home() {
  const navigate = useNavigate()
  const { addToCart, cart } = useCart()
  const { user } = useAuth()

  const handleProductClick = () => {
    navigate('/products')
  }

  const handleViewAll = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`)
  }

  const getProductsByCategory = (category) =>
    productsData.filter(p => p.category === category).slice(0, 4)

  const isInCart = (id) => cart.some(item => item.id === id)

  const handleAddToCartGuarded = (product) => {
    if (!user) {
      navigate('/signin')
      return
    }
    addToCart(product)
  }

  return (
    <>
      <NavBar />
      <Banner />

      <main className={styles.home}>
        <section className={styles.section}>
          <ProductList
            title="True Wireless"
            products={getProductsByCategory('earbuds')}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCartGuarded}
            isInCart={isInCart}
            ctaLabel="Add to cart"
            onViewAll={() => handleViewAll('earbuds')}
          />
        </section>

        <section className={styles.section}>
          <ProductList
            title="Smart Watches"
            products={getProductsByCategory('smartwatch')}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCartGuarded}
            isInCart={isInCart}
            ctaLabel="Add to cart"
            onViewAll={() => handleViewAll('smartwatch')}
          />
        </section>

        <section className={styles.section}>
          <ProductList
            title="Speakers"
            products={getProductsByCategory('speaker')}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCartGuarded}
            isInCart={isInCart}
            ctaLabel="Add to cart"
            onViewAll={() => handleViewAll('speaker')}
          />
        </section>
      </main>

      <Footer />
    </>
  )
}
