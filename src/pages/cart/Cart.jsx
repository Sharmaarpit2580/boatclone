import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../components/cart/CartContext';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import styles from './Cart.module.css';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const formatPrice = (priceStr) => {
    return priceStr;
  };

  const calculateItemTotal = (item) => {
    const price = parseFloat(item.price.replace(/[₹,]/g, ''));
    return price * item.quantity;
  };

  if (cart.length === 0) {
    return (
      <div>
        <Navbar />
        <div className={styles.emptyContainer}>
          <div className={styles.emptyContent}>
            <div className={styles.emptyIcon}>🛒</div>
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptyText}>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" className={styles.shopBtn}>
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Shopping Cart</h1>
            <p className={styles.subtitle}>{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
          </div>

          <div className={styles.content}>
            <div className={styles.itemsSection}>
              {cart.map(item => (
                <div key={item.id} className={styles.itemCard}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemPrice}>{formatPrice(item.price)}</p>
                    {item.tag && <span className={styles.itemTag}>{item.tag}</span>}
                  </div>
                  <div className={styles.itemControls}>
                    <div className={styles.quantityControl}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <p className={styles.itemTotal}>₹{calculateItemTotal(item).toLocaleString('en-IN')}</p>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summarySection}>
              <div className={styles.summaryCard}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span className={styles.free}>FREE</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Tax</span>
                  <span>₹{Math.round(getCartTotal() * 0.18).toLocaleString('en-IN')}</span>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.summaryRowTotal}>
                  <span>Total</span>
                  <span>₹{(getCartTotal() + Math.round(getCartTotal() * 0.18)).toLocaleString('en-IN')}</span>
                </div>
                <button className={styles.checkoutBtn}>Proceed to Checkout</button>
                <Link to="/" className={styles.continueBtn}>Continue Shopping</Link>
                <button className={styles.clearBtn} onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

