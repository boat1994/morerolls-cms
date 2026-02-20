// Types and constants are safe to import in Client Components
export type Locale = 'en' | 'th'
export const LOCALE_COOKIE = 'NEXT_LOCALE'
export const DEFAULT_LOCALE: Locale = 'en'
export const SUPPORTED_LOCALES: Locale[] = ['en', 'th']

/**
 * Read locale from cookie — Server Components only.
 * `next/headers` is imported lazily inside the function so
 * Client Components can safely import the types above.
 */
export async function getLocale(): Promise<Locale> {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()
  const value = cookieStore.get(LOCALE_COOKIE)?.value
  if (value && SUPPORTED_LOCALES.includes(value as Locale)) {
    return value as Locale
  }
  return DEFAULT_LOCALE
}
