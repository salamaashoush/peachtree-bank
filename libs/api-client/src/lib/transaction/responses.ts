import { IMerchant } from '../merchant';
import { CurrencyCode } from '../types';

export interface ITransactionItem {
  categoryCode: string;
  dates: ITransactionDates;
  transaction: ITransaction;
  merchant: IMerchant;
}

export interface ITransactionDates {
  valueDate: number | string;
}

export interface ITransaction {
  amountCurrency: ITransactionAmount;
  type: string;
  creditDebitIndicator: CreditDebitIndicator;
}

export interface ITransactionAmount {
  amount: number | string;
  currencyCode: CurrencyCode;
}

export type CreditDebitIndicator = 'CRDT' | 'DBIT';
