import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from '../types';
import { ITransactionItem } from './types';

export enum TransactionApCalls {
  All = 'transactions.json',
}

@Injectable({ providedIn: 'root' })
export class TransactionApiService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<IApiResponse<ITransactionItem[]>>(
      TransactionApCalls.All
    );
  }
}
