import { CurrencyCode } from '@backbase/api-client';

export function currencyCodeToSymbol(code: CurrencyCode): string {
  const symbol = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: code,
  })
    .formatToParts(1)
    .find((x) => x.type === 'currency');
  return symbol?.value ?? '$';
}

export function getUserLocale(defaultValue: string): string {
  if (
    typeof window === 'undefined' ||
    typeof window.navigator === 'undefined'
  ) {
    return defaultValue;
  }
  const wn = window.navigator as any;
  let lang = wn.languages ? wn.languages[0] : defaultValue;
  lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
  return lang;
}
// lodash/kebabCase is ignoring symbols
export function kebabCase(str: string) {
  return str.toLowerCase().split(' ').join('-');
}
