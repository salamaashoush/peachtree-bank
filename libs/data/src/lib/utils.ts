import { CurrencyCode, IAccount } from '@backbase/api-client';

/**
 * convert currency code `EUR` to currency symbol using Intl api
 *
 * @export
 * @param {CurrencyCode} code
 * @returns {string}
 */
export function currencyCodeToSymbol(code: CurrencyCode): string {
  const symbol = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: code,
  })
    .formatToParts(1)
    .find((x) => x.type === 'currency');
  return symbol?.value ?? '$';
}

/**
 * get user locale
 *
 * @export
 * @param {string} defaultValue
 * @returns {string}
 */
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
/**
 * convert string to kebab case `H&M store` => `h&m-store`, operating word with space
 * Note:  lodash/kebabCase ignores symbols `H&M store` => `hm-store`
 * @export
 * @param {string} str
 * @returns {string}
 */
export function kebabCase(str: string): string {
  return str.toLowerCase().split(' ').join('-');
}

/**
 * convert account data to a string
 *
 * @export
 * @param {IAccount} account
 * @returns {string}
 */
export function accountToString(account: IAccount): string {
  return `${account?.name}(${account?.number}) - ${currencyCodeToSymbol(
    account?.currencyCode ?? 'EUR'
  )}${account?.currentBalance.toFixed(2)}`;
}
