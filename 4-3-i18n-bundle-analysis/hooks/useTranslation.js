import { useState, useEffect } from 'react'

export function useTranslation(locale = 'ko') {
  const [messages, setMessages] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    import(`../locales/${locale}.json`)
      .then((module) => {
        setMessages(module.default)
        setLoading(false)
      })
      .catch((error) => {
        console.error(`Failed to load locale: ${locale}`, error)
        setLoading(false)
      })
  }, [locale])

  const t = (key) => {
    if (!messages) return key

    const keys = key.split('.')
    let value = messages

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key
      }
    }

    return value
  }

  return { t, loading, messages }
}
