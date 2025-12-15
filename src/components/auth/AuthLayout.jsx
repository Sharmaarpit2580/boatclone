import React from 'react'
import styles from './Auth.module.css'

export default function AuthLayout({
  title,
  subtitle,
  heroTitle,
  heroText,
  image,
  children,
  footer,
}) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div
          className={styles.hero}
          style={{
            backgroundImage: `linear-gradient(160deg, rgba(0,0,0,0.25), rgba(0,0,0,0.75)), url(${image})`,
          }}
        >
          <div className={styles.heroContent}>
            <div className={styles.branding}>
              <img
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/boat-logo-new.svg?v=1682421521"
                alt="boAt logo"
              />
              <span className={styles.badge}>Lifestyle</span>
            </div>
            <span className={styles.label}>boAt • Play the Vibe</span>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtext}>{subtitle}</p>

            <div className={styles.pills}>
              <span className={styles.pill}>{heroTitle}</span>
              <span className={styles.pill}>{heroText}</span>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Members</span>
                <span className={styles.statValue}>3M+ crew</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Avg. delivery</span>
                <span className={styles.statValue}>48 hrs</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.formPanel}>
          {children}
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    </div>
  )
}

