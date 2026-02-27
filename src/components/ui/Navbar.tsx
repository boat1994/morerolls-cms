import { getLocale } from '@/lib/locale'
import { getDictionary } from '@/lib/i18n'
import { NavbarClient } from './NavbarClient'

/**
 * Server Component wrapper — reads locale from cookie then passes it
 * to the client-side NavbarClient so LanguageSwitcher can reflect the current locale.
 */
export async function Navbar() {
  const locale = await getLocale()
  const dict = await getDictionary(locale)
  
  return <NavbarClient currentLocale={locale} dict={dict.nav} searchDict={dict.search} />
}

