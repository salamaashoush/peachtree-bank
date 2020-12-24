import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from '../types';
import { IAccount } from './responses';

export enum AccountApCalls {
  GetAccount = 'account.json',
}

@Injectable({ providedIn: 'root' })
export class AccountApiService {
  constructor(private httpClient: HttpClient) {}

  getAccount() {
    return this.httpClient.get<IApiResponse<IAccount>>(
      AccountApCalls.GetAccount
    );
  }
}
