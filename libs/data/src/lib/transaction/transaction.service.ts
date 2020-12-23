import { Injectable } from '@angular/core';
import {
  IApiResponse,
  ITransactionItem,
  TransactionApiService,
} from '@backbase/api-client';
import { orderBy } from 'lodash-es';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IOrderBy } from '../types';
import { Transaction } from './transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionDataService {
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  private activeSearchSubject = new BehaviorSubject<string>('');
  private activeSortSubject = new BehaviorSubject<IOrderBy>({
    key: 'date',
    order: 'asc',
  });
  public transaction$: Observable<Transaction[]>;
  public activeSearch$: Observable<string>;
  public activeSort$: Observable<IOrderBy>;

  constructor(private transactionApiService: TransactionApiService) {
    this.activeSearch$ = this.activeSearchSubject.asObservable();
    this.activeSort$ = this.activeSortSubject.asObservable();
    this.transaction$ = combineLatest([
      this.activeSearchSubject,
      this.activeSortSubject,
      this.transactionsSubject,
    ]).pipe(
      map(([searchValue, { order, key }, transactions]) => {
        console.log(key, order);
        return orderBy(
          transactions.filter((t) => t.includes(searchValue)),
          key,
          order
        );
      })
    );
  }

  fetchAll() {
    return this.transactionApiService.getAll().pipe(
      switchMap((data) => {
        this.transactionsSubject.next(this.mapGetAllResponse(data));
        return this.transaction$;
      })
    );
  }

  updateSearch(filter: string) {
    this.activeSearchSubject.next(filter);
  }

  updateSort(sortBy: IOrderBy) {
    this.activeSortSubject.next(sortBy);
  }

  create() {
    // return this.transactionApiService.getAll().pipe(
    //   switchMap((data) => {
    //     this.transactionsSubject.next(this.mapGetAllResponse(data));
    //     return this.transaction$;
    //   })
    // );
  }

  private mapGetAllResponse(response: IApiResponse<ITransactionItem[]>) {
    return (response?.data ?? []).map(
      (transactionData) => new Transaction(transactionData)
    );
  }
}
