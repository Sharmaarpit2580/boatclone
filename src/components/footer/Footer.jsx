import React from 'react'
import styles from './Footer.module.css'

const shopLinks = ['True Wireless', 'Smart Watches', 'Neckbands', 'Headphones', 'Speakers']
const helpLinks = ['Track Order', 'Warranty', 'Return Policy', 'Service Centers', 'FAQs']
const companyLinks = ['About boAt', 'Blogs', 'Careers', 'Corporate Orders', 'Contact Us']

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topLine}>
        <span>⚡ Join the boAthead crew • New drops weekly • Free shipping over ₹499</span>
        <a href="#shop" className={styles.cta}>
          Explore now
        </a>
      </div>

      <div className={styles.content}>
        <div className={styles.brandBlock}>
          <div className={styles.brandRow}>
            <img
              className={styles.logo}
              src="https://i.pinimg.com/736x/1e/42/b6/1e42b6fe43f65985bb8c61167376d290.jpg"
              alt="boAt"
            />
            <span className={styles.tag}>Lifestyle</span>
          </div>
          <p className={styles.copy}>
            Plug into Nirvana with audio, wearables, and accessories crafted for bold sound and
            bolder style.
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram">
              ♡
            </a>
            <a href="#" aria-label="Twitter">
              ✦
            </a>
            <a href="#" aria-label="YouTube">
              ▶
            </a>
          </div>
        </div>

        <div className={styles.linkColumns}>
          <div>
            <h4>Shop</h4>
            <ul>
              {shopLinks.map(item => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul>
              {helpLinks.map(item => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              {companyLinks.map(item => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.newsletter}>
          <h4>Stay in the vibe</h4>
          <p>Get early access to launches, limited drops, and insider offers.</p>
          <form className={styles.form} onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
          <small>We respect your inbox. Unsubscribe anytime.</small>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Imagine Marketing Limited. All rights reserved.</span>
        <div className={styles.payments}>
          <span>Visa</span>
          <span>Mastercard</span>
          <span>UPI</span>
          <span>Paytm</span>
        </div>
      </div>
    </footer>
  )
}

