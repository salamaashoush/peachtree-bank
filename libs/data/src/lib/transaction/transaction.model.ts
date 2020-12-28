import { formatCurrency, formatDate, getCurrencySymbol } from '@angular/common';
import { ITransactionItem } from '@backbase/api-client';
import { getUserLocale, kebabCase } from '../utils';

export class Transaction {
  public id: string;
  public categoryCode: string;
  public type: string;
  public amount: number;
  public amountFormatted: string;
  public indicator: '-' | '+';
  public beneficiary: string;
  public date: number;
  public dateFormatted: string;
  public beneficiaryLogo: string;
  public currencyCode: string;

  constructor(private apiData: ITransactionItem) {
    const userLocale = getUserLocale('en-US');
    this.categoryCode = this.apiData.categoryCode;
    this.type = this.apiData.transaction.type;
    const amount = this.apiData.transaction?.amountCurrency?.amount;
    this.amount = typeof amount === 'string' ? parseFloat(amount) : amount;
    this.currencyCode = this.apiData.transaction?.amountCurrency?.currencyCode;
    this.beneficiary = this.apiData?.merchant?.name;
    this.id = `${kebabCase(this.beneficiary)}-${this.amount}-${kebabCase(
      this.type
    )}`;
    this.indicator =
      this.apiData.transaction?.creditDebitIndicator === 'CRDT' ? '+' : '-';
    this.amountFormatted = formatCurrency(
      this.amount,
      userLocale,
      getCurrencySymbol(this.currencyCode, 'narrow')
    );
    this.date = new Date(this.apiData.dates?.valueDate).getTime();
    this.dateFormatted = formatDate(this.date, 'MMM d', userLocale);
    this.beneficiaryLogo = `/assets/icons/${kebabCase(this.beneficiary)}.png`;
  }

  /**
   * check if the `beneficiary` or `type` includes the search keyword
   *
   * @param {string} search
   * @returns {boolean}
   * @memberof Transaction
   */
  includes(search: string): boolean {
    if (search) {
      return `${this.beneficiary}${this.type}`
        .toLowerCase()
        .includes(search.toLowerCase());
    }
    return true;
  }
}
