import { formatDate } from '@angular/common';
import { ITransactionItem } from '@backbase/api-client';
import { currencyCodeToSymbol, getUserLocale, kebabCase } from '../utils';

export class Transaction {
  public categoryCode: string;
  public type: string;
  public amount: number;
  public amountFormatted: string;
  public indicator: '-' | '+';
  public currency: string;
  public beneficiary: string;
  public date: number;
  public dateFormatted: string;
  public beneficiaryLogo: string;
  public fullDate: string;

  constructor(private apiData: ITransactionItem) {
    this.categoryCode = this.apiData.categoryCode;
    this.type = this.apiData.transaction.type;
    const amount = this.apiData.transaction?.amountCurrency?.amount;
    this.amount = typeof amount === 'string' ? parseFloat(amount) : amount;
    this.currency = currencyCodeToSymbol(
      this.apiData.transaction?.amountCurrency?.currencyCode
    );
    this.beneficiary = this.apiData?.merchant?.name;
    this.indicator =
      this.apiData.transaction?.creditDebitIndicator === 'CRDT' ? '+' : '-';
    this.amountFormatted = `${this.indicator}${this.currency}${this.amount}`;
    const date = new Date(this.apiData.dates?.valueDate);
    this.date = date.getTime();
    this.fullDate = formatDate(date, 'full', getUserLocale('en-US'));
    this.dateFormatted = formatDate(date, 'MMM d', getUserLocale('en-US'));
    this.beneficiaryLogo = `/assets/icons/${kebabCase(this.beneficiary)}.png`;
  }

  includes(search: string) {
    if (search) {
      return `${this.beneficiary}${this.type}`
        .toLowerCase()
        .includes(search.toLowerCase());
    }
    return true;
  }
}
