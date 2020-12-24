import { Injectable } from '@angular/core';
import { IMerchant, MerchantApiService } from '@backbase/api-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MerchantDataService {
  private merchantsSubject = new BehaviorSubject<IMerchant[]>([]);
  public merchants$: Observable<
    IMerchant[]
  > = this.merchantsSubject.asObservable();

  constructor(private merchantsApiService: MerchantApiService) {}

  /**
   * fetch all merchants from api service
   *
   * @returns {Observable<IMerchant[]>}
   * @memberof MerchantDataService
   */
  fetchAll(): Observable<IMerchant[]> {
    return this.merchantsApiService.getAll().pipe(
      first(),
      switchMap((res) => {
        this.merchantsSubject.next(res.data);
        return this.merchants$;
      })
    );
  }

  /**
   * find merchant by name
   *
   * @param {string} name
   * @returns {Observable<IMerchant>}
   * @memberof MerchantDataService
   */
  getByName(name: string): Observable<IMerchant> {
    return this.merchants$.pipe(
      map((merchants) => merchants.find((merchant) => merchant.name === name))
    );
  }

  /**
   * get list of merchant names
   *
   * @returns {Observable<string[]>}
   * @memberof MerchantDataService
   */
  getNames(): Observable<string[]> {
    return this.merchants$.pipe(
      map((merchants) => merchants.map(({ name }) => name))
    );
  }
}
