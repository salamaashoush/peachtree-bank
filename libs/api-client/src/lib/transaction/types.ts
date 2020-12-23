export interface ITransactionItem {
  categoryCode: string;
  dates: ITransactionDates;
  transaction: ITransaction;
  merchant: ITransactionMerchant;
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

export interface ITransactionMerchant {
  name: string;
  accountNumber: string;
}

export type CurrencyCode = 'EUR' | 'USD';
export type CreditDebitIndicator = 'CRDT' | 'DBIT';
