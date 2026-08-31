'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import styles from '../staff-login/StaffLogin.module.css'
import {
  FiLock,
  FiMail,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
  FiShield,
  FiCheckCircle,
  FiAlertCircle,
  FiUserCheck,
  FiExternalLink,
  FiLogOut,
} from 'react-icons/fi'

function LoginFormContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTarget = searchParams.get('redirect') || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Current session status
  const [checkingSession, setCheckingSession] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)

  // Check if already authenticated on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/users/me', {
          credentials: 'include',
        })
        if (res.ok) {
          const data = await res.json()
          if (data.user) {
            setCurrentUser(data.user)
          }
        }
      } catch (err) {
        console.warn('Session check failed:', err)
      } finally {
        setCheckingSession(false)
      }
    }
    checkAuth()
  }, [])

  // Handle Login Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok || !data.user) {
        const errMsg =
          data.errors?.[0]?.message ||
          data.message ||
          'Invalid credentials. Please verify your email and password.'
        setError(errMsg)
        setLoading(false)
        return
      }

      const role = data.user.role || 'manager'
      setSuccess(
        `Authenticated as ${role === 'admin' ? 'Administrator' : 'Production Manager'}. Redirecting...`
      )

      // Determine destination:
      // If manager tries to go to /admin, force /dashboard. Otherwise honor redirectTarget.
      let destination = redirectTarget
      if (role === 'manager' && destination.startsWith('/admin')) {
        destination = '/dashboard'
      }

      setTimeout(() => {
        router.push(destination)
      }, 700)
    } catch (err: any) {
      setError(err.message || 'An unexpected network error occurred. Please try again.')
      setLoading(false)
    }
  }

  // Handle Logout from active session
  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      })
      setCurrentUser(null)
      setEmail('')
      setPassword('')
    } catch (err) {
      console.warn('Logout error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.portalPage}>
      <div className={styles.gridPattern} />
      <div className={styles.ambientGlow} />

      {/* Top Bar navigation */}
      <div className={styles.topBar}>
        <Link href="/" className={styles.backLink}>
          <FiArrowLeft /> Back to Website
        </Link>
        <div className={styles.portalBadge}>
          <FiShield /> Staff Portal
        </div>
      </div>

      {/* Main Glass Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.brandLogoWrap}>MG</div>
          <h1 className={styles.title}>Staff & Management Login</h1>
          <p className={styles.subtitle}>
            Sign in to access the Magic Glass Live CMS Dashboard and production controls.
          </p>
        </div>

        {checkingSession ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div className={styles.spinner} style={{ margin: '0 auto 1rem auto' }} />
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Verifying session...</p>
          </div>
        ) : currentUser ? (
          /* Active Session Detected */
          <div className={styles.activeSessionBox}>
            <div className={styles.userAvatar}>
              {currentUser.name?.[0] || currentUser.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className={styles.activeSessionEmail}>{currentUser.email}</div>
            <div
              className={`${styles.activeSessionRole} ${
                currentUser.role === 'admin' ? styles.roleAdmin : styles.roleManager
              }`}
            >
              Role: {currentUser.role || 'manager'}
            </div>

            <div className={styles.sessionActions}>
              <button
                type="button"
                className={styles.submitBtn}
                onClick={() => router.push(currentUser.role === 'admin' && redirectTarget.startsWith('/admin') ? redirectTarget : '/dashboard')}
              >
                <FiUserCheck /> Continue to Live Dashboard →
              </button>

              {currentUser.role === 'admin' && (
                <a
                  href="/admin"
                  className={styles.secondaryBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiExternalLink /> Open Payload CMS (/admin)
                </a>
              )}

              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={handleLogout}
                disabled={loading}
              >
                <FiLogOut /> Sign Out / Switch Account
              </button>
            </div>
          </div>
        ) : (
          /* Login Form */
          <>
            {error && (
              <div className={styles.errorAlert}>
                <FiAlertCircle style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className={styles.successAlert}>
                <FiCheckCircle style={{ flexShrink: 0 }} />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.fieldGroup}>
                <div className={styles.labelRow}>
                  <label htmlFor="staff-email" className={styles.label}>
                    Work Email Address
                  </label>
                </div>
                <div className={styles.inputWrap}>
                  <FiMail className={styles.inputIcon} />
                  <input
                    id="staff-email"
                    type="email"
                    required
                    placeholder="name@magicglass.co.in"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <div className={styles.labelRow}>
                  <label htmlFor="staff-password" className={styles.label}>
                    Password
                  </label>
                </div>
                <div className={styles.inputWrap}>
                  <FiLock className={styles.inputIcon} />
                  <input
                    id="staff-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading || Boolean(success)}
                id="staff-login-submit-btn"
              >
                {loading ? (
                  <>
                    <span className={styles.spinner} />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <FiLock /> Sign In to Dashboard
                  </>
                )}
              </button>
            </form>

            <div className={styles.footerNote}>
              Production Manager role is automatically routed to the Live Visual Dashboard.
              Payload CMS (/admin) is strictly restricted to Administrators.
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '100vh', background: '#080c14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '24px', height: '24px', border: '2px solid rgba(255,255,255,0.2)', borderTopColor: '#e11d48', borderRadius: '50%', animation: 'spin 0.75s linear infinite' }} />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  )
}
