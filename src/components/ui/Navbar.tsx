import { getLocale } from '@/lib/locale'
import { NavbarClient } from './NavbarClient'

/**
 * Server Component wrapper — reads locale from cookie then passes it
 * to the client-side NavbarClient so LanguageSwitcher can reflect the current locale.
 */
export async function Navbar() {
  const locale = await getLocale()
  return <NavbarClient currentLocale={locale} />
}
