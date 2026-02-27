import { Locale } from './locale'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  th: () => import('@/dictionaries/th.json').then((module) => module.default),
}

export type Dictionary = Awaited<ReturnType<typeof dictionaries.en>>

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]?.() ?? dictionaries.en()
}
