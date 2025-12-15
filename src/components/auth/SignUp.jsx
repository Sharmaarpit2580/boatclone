import React from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import styles from './Auth.module.css'
import heroImage from '../../assets/slider4.png'

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <AuthLayout
      title="Join boAt Lifestyle"
      subtitle="Unlock member-only drops, faster checkout, and curated picks."
      heroTitle="Sound that moves"
      heroText="Wearables that groove"
      image={heroImage}
    >
      <div className={styles.formHeader}>
        <h2>Create your account</h2>
        <p>We will tailor recommendations based on your vibe.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Full name</label>
          <input id="name" type="text" name="name" placeholder="Aman Singh" required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" placeholder="you@boat.com" required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Create a strong password"
            required
            minLength={6}
          />
          <small>Must be at least 6 characters.</small>
        </div>

        <div className={styles.row}>
          <label className={styles.checkbox}>
            <input type="checkbox" name="offers" defaultChecked />
            Keep me posted about new drops and offers
          </label>
        </div>

        <button type="submit" className={styles.primaryButton}>
          Create account
        </button>

        <div className={styles.divider}>or</div>

        <div className={styles.inlineActions}>
          <button type="button" className={styles.secondaryButton}>
            <span aria-hidden="true">🔗</span> Continue with Google
          </button>
          <button type="button" className={styles.secondaryButton}>
            <span aria-hidden="true">📱</span> Continue with phone
          </button>
        </div>
      </form>

      <div className={styles.note}>
        By creating an account you agree to boAt&apos;s terms of use and consent to
        receive updates. You can unsubscribe anytime.
      </div>

      <div className={styles.footer}>
        Already have an account? <Link to="/signin">Sign in</Link>
      </div>
    </AuthLayout>
  )
}

