import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from '../types';
import { ITransactionItem } from './responses';

export enum TransactionApCalls {
  All = 'transactions.json',
}

@Injectable({ providedIn: 'root' })
export class TransactionApiService {
  constructor(private httpClient: HttpClient) {}

  /**
   * get all transactions from backend
   *
   * @returns
   * @memberof TransactionApiService
   */
  getAll() {
    return this.httpClient.get<IApiResponse<ITransactionItem[]>>(
      TransactionApCalls.All
    );
  }

  /**
   * create default transaction api object
   *
   * @returns {ITransactionItem}
   * @memberof TransactionApiService
   */
  getDefaultTransactionItem(): ITransactionItem {
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
}
