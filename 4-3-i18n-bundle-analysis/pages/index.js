import { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'

export default function Home() {
  const [locale, setLocale] = useState('ko')
  const { t, loading } = useTranslation(locale)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1>{t('common.appName')}</h1>
        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={() => setLocale('ko')}
            style={{
              padding: '0.5rem 1rem',
              marginRight: '0.5rem',
              backgroundColor: locale === 'ko' ? '#0070f3' : '#eaeaea',
              color: locale === 'ko' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            한국어
          </button>
          <button
            onClick={() => setLocale('en')}
            style={{
              padding: '0.5rem 1rem',
              marginRight: '0.5rem',
              backgroundColor: locale === 'en' ? '#0070f3' : '#eaeaea',
              color: locale === 'en' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            English
          </button>
          <button
            onClick={() => setLocale('ja')}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: locale === 'ja' ? '#0070f3' : '#eaeaea',
              color: locale === 'ja' ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            日本語
          </button>
        </div>
      </header>

      <main>
        <section style={{ marginBottom: '2rem' }}>
          <h2>{t('home.title')}</h2>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>{t('home.subtitle')}</p>
          <p>{t('home.description')}</p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h3>{t('home.features.title')}</h3>
          <ul>
            <li>{t('home.features.dynamicImport')}</li>
            <li>{t('home.features.bundleAnalysis')}</li>
            <li>{t('home.features.codesplitting')}</li>
            <li>{t('home.features.lazy')}</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h3>{t('home.howToUse.title')}</h3>
          <ol>
            <li>{t('home.howToUse.step1')}</li>
            <li>{t('home.howToUse.step2')}</li>
            <li>{t('home.howToUse.step3')}</li>
            <li>{t('home.howToUse.step4')}</li>
          </ol>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h3>{t('about.title')}</h3>
          <p>{t('about.content')}</p>
        </section>

        <section
          style={{
            padding: '1.5rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            marginBottom: '2rem',
          }}
        >
          <h3>{t('navigation.home')}</h3>
          <nav>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>{t('navigation.about')}</li>
              <li>{t('navigation.contact')}</li>
              <li>{t('navigation.services')}</li>
              <li>{t('navigation.products')}</li>
              <li>{t('navigation.pricing')}</li>
              <li>{t('navigation.blog')}</li>
            </ul>
          </nav>
        </section>

        <section>
          <h3>{t('form.submit')}</h3>
          <div style={{ display: 'grid', gap: '1rem', maxWidth: '400px' }}>
            <div>
              <label>{t('form.name')}</label>
              <input
                type="text"
                placeholder={t('form.name')}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              />
            </div>
            <div>
              <label>{t('form.email')}</label>
              <input
                type="email"
                placeholder={t('form.email')}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              />
            </div>
            <div>
              <label>{t('form.message')}</label>
              <textarea
                placeholder={t('form.message')}
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                }}
              />
            </div>
            <button
              style={{
                padding: '0.75rem',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              {t('form.submit')}
            </button>
          </div>
        </section>
      </main>

      <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #eaeaea' }}>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          {t('common.appName')} - {t('navigation.privacy')} | {t('navigation.terms')}
        </p>
      </footer>
    </div>
  )
}
