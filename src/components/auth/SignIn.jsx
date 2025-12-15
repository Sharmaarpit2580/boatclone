import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import styles from './Auth.module.css'
import heroImage from '../../assets/slider3.png'
import { useAuth } from './AuthContext'

export default function SignIn() {
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString() || ''
    const displayName = email.split('@')[0] || 'boAthead'

    signIn({
      name: displayName,
      email,
    })

    navigate('/', { replace: true })
  }

  return (
    <AuthLayout
      title="Welcome back to the boAt crew"
      subtitle="Pick up where you left off and keep the vibe flowing."
      heroTitle="Priority support"
      heroText="Exclusive launches"
      image={heroImage}
    >
      <div className={styles.formHeader}>
        <h2>Sign in</h2>
        <p>Access orders, wishlist, and your personalised soundscape.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" placeholder="Enter your email" autoComplete="email" required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            minLength={6}
        
          />
        </div>

        <div className={styles.row}>
          <label className={styles.checkbox}>
            <input type="checkbox" name="remember" />
            Remember me
          </label>
          <Link to="#" className={styles.link}>Forgot password?</Link>
        </div>

        <button type="submit" className={styles.primaryButton}>
          Sign in securely
        </button>

        <div className={styles.divider}>or</div>

        <button type="button" className={styles.secondaryButton}>
          <span aria-hidden="true">⚡</span> Continue with Google
        </button>
      </form>

      <div className={styles.note}>
        By continuing, you agree to boAt&apos;s terms of use and privacy policy.
      </div>

      <div className={styles.footer}>
        New to boAt? <Link to="/signup">Create an account</Link>
      </div>
    </AuthLayout>
  )
}

