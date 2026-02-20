'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { LOCALE_COOKIE, SUPPORTED_LOCALES, type Locale } from '@/lib/locale'

interface LanguageSwitcherProps {
  currentLocale: Locale
  className?: string
  /** Color variant for the text — pass 'white' on transparent nav */
  colorClass?: string
}

export function LanguageSwitcher({
  currentLocale,
  className = '',
  colorClass = 'text-current',
}: LanguageSwitcherProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSwitch = (locale: Locale) => {
    if (locale === currentLocale) return

    // Set cookie (1 year)
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`

    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <div
      className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-widest select-none ${colorClass} ${className}`}
    >
      {SUPPORTED_LOCALES.map((locale, idx) => (
        <span key={locale} className="flex items-center gap-1">
          {idx > 0 && <span className="opacity-30">|</span>}
          <button
            onClick={() => handleSwitch(locale)}
            disabled={isPending}
            className={`transition-opacity duration-200 ${
              currentLocale === locale
                ? 'opacity-100 font-bold'
                : 'opacity-40 hover:opacity-70 cursor-pointer'
            } ${isPending ? 'pointer-events-none' : ''}`}
            aria-label={`Switch to ${locale === 'en' ? 'English' : 'Thai'}`}
          >
            {locale.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}
