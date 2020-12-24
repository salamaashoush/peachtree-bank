import { Injectable } from '@angular/core';
import { IMerchant, TransactionApiService } from '@backbase/api-client';
import { merge, orderBy } from 'lodash-es';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { IOrderBy } from '../types';
import { Transaction } from './transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionDataService {
  /**
   * rxjs subject to cache all transaction coming from backend
   *
   * @private
   * @memberof TransactionDataService
   */
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  /**
   * active search subject
   *
   * @private
   * @memberof TransactionDataService
   */
  private activeSearchSubject = new BehaviorSubject<string>('');
  /**
   * active sort
   *
   * @private
   * @memberof TransactionDataService
   */
  private activeSortSubject = new BehaviorSubject<IOrderBy>({
    key: 'date',
    order: 'desc',
  });
  /**
   * derived transactions stream after filtering and sorting
   *
   * @type {Observable<Transaction[]>}
   * @memberof TransactionDataService
   */
  public transaction$: Observable<Transaction[]>;
  /**
   * active search stream pushes new value every time user changes search
   *
   * @type {Observable<string>}
   * @memberof TransactionDataService
   */
  public activeSearch$: Observable<string>;
  /**
   * active sort stream pushes new value every time user changes sort
   *
   * @type {Observable<IOrderBy>}
   * @memberof TransactionDataService
   */
  public activeSort$: Observable<IOrderBy>;

  constructor(private transactionApiService: TransactionApiService) {
    this.activeSearch$ = this.activeSearchSubject.asObservable();
    this.activeSort$ = this.activeSortSubject.asObservable();
    /*
     * the magic of reactive programing
     * by combining the original data stream we can derive the final sorted/filtered transactions without changing the original data
     */
    this.transaction$ = combineLatest([
      this.activeSearchSubject,
      this.activeSortSubject,
      this.transactionsSubject,
    ]).pipe(
      map(([searchValue, { order, key }, transactions]) => {
        return orderBy(
          transactions.filter((t) => t.includes(searchValue)),
          key,
          order
        );
      })
    );
  }

  /**
   * fetch all transactions from backend by calling api service
   *
   * @returns
   * @memberof TransactionDataService
   */
  fetchAll() {
    return this.transactionApiService.getAll().pipe(
      first(),
      switchMap((res) => {
        // transforming the api date to frontend model Transaction
        this.transactionsSubject.next(
          res.data.map((data) => new Transaction(data))
        );
        return this.transaction$;
      })
    );
  }

  /**
   * pushes new value to search stream
   *
   * @param {string} filter
   * @memberof TransactionDataService
   */
  updateSearch(filter: string) {
    this.activeSearchSubject.next(filter);
  }

  /**
   * pushes new value to sort stream
   *
   * @param {IOrderBy} sortBy
   * @memberof TransactionDataService
   */
  updateSort(sortBy: IOrderBy) {
    this.activeSortSubject.next(sortBy);
  }

  /**
   * create new Transaction object, and provide default values
   *
   * @param {number} amount
   * @param {IMerchant} merchant
   * @returns {Transaction}
   * @memberof TransactionDataService
   */
  createTransaction(amount: number, merchant: Partial<IMerchant>): Transaction {
    const defaultData = this.transactionApiService.getDefaultTransactionItem();
    const transactionData = merge(defaultData, {
      transaction: {
        amountCurrency: {
          amount,
        },
      },
      merchant,
    });
    const transaction = new Transaction(transactionData);
    this.transactionsSubject.next([
      transaction,
      ...this.transactionsSubject.getValue(),
    ]);
    return transaction;
  }
}
