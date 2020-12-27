import { ITransactionItem } from './responses';

export function getDefaultTransactionItem(): ITransactionItem {
  return {
    categoryCode: '#1180aa',
    dates: {
      valueDate: Date.now(),
    },
    transaction: {
      amountCurrency: {
        amount: 50,
        currencyCode: 'EUR',
      },
      type: 'Transaction',
      creditDebitIndicator: 'DBIT',
    },
    merchant: {
      name: 'Jon doe',
      accountNumber: 'SI64397745065188826',
    },
  };
}
