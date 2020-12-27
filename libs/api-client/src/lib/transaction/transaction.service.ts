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
}
