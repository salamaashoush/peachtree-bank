import { ITransactionItem } from '@backbase/api-client';
import { kebabCase } from '../utils';

export class Transaction {
  public categoryCode: string;
  public type: string;
  public amount: number;
  public amountFormatted: string;
  public indicator: '-' | '+';
  public beneficiary: string;
  public date: number;
  public dateFormatted: string;
  public beneficiaryLogo: string;
  public fullDate: string;
  public currencyCode: string;

  constructor(private apiData: ITransactionItem) {
    this.categoryCode = this.apiData.categoryCode;
    this.type = this.apiData.transaction.type;
    const amount = this.apiData.transaction?.amountCurrency?.amount;
    this.amount = typeof amount === 'string' ? parseFloat(amount) : amount;
    this.currencyCode = this.apiData.transaction?.amountCurrency?.currencyCode;
    this.beneficiary = this.apiData?.merchant?.name;
    this.indicator =
      this.apiData.transaction?.creditDebitIndicator === 'CRDT' ? '+' : '-';
    this.date = new Date(this.apiData.dates?.valueDate).getTime();
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
