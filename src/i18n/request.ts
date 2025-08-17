import {getRequestConfig} from 'next-intl/server'
import {locales, defaultLocale} from './config'

export default getRequestConfig(async ({locale}) => {
  const activeLocale = (locales as readonly string[]).includes(locale) ? locale : defaultLocale
  const messages = (await import(`../messages/${activeLocale}.json`)).default
  return {
    locale: activeLocale,
    messages,
  }
})


