import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { IAccount } from '@backbase/api-client';

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
  return `${account?.name}(${account?.number}) - ${formatCurrency(
    account?.currentBalance,
    getUserLocale('en-US'),
    getCurrencySymbol(account?.currencyCode ?? 'EUR', 'narrow')
  )}`;
}
