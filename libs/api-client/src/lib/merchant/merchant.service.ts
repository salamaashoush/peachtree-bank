import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransactionApiService } from '../transaction';
import { IApiResponse } from '../types';
import { IMerchant } from './responses';

@Injectable({ providedIn: 'root' })
export class MerchantApiService {
  constructor(private transactionApiService: TransactionApiService) {}

  getAll(): Observable<IApiResponse<IMerchant[]>> {
    // extract merchants from mock transactions
    return this.transactionApiService.getAll().pipe(
      map((res) => ({
        data: res.data.map(({ merchant }) => merchant),
      }))
    );
  }
}
