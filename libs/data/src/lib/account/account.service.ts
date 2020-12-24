import { Injectable } from '@angular/core';
import { AccountApiService, IAccount, IMerchant } from '@backbase/api-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { TransactionDataService } from '../transaction';

@Injectable({ providedIn: 'root' })
export class AccountDataService {
  /**
   * account subject to caching
   *
   * @private
   * @memberof AccountDataService
   */
  private accountSubject = new BehaviorSubject<IAccount>(null);
  /**
   * account stream pushes new value on every account update
   *
   * @type {Observable<IAccount>}
   * @memberof AccountDataService
   */
  public account$: Observable<IAccount> = this.accountSubject.asObservable();
  constructor(
    private transactionService: TransactionDataService,
    private accountApiService: AccountApiService
  ) {}

  /**
   * fetch account data from api service
   *
   * @returns {Observable<IAccount>}
   * @memberof AccountDataService
   */
  fetchAccount(): Observable<IAccount> {
    return this.accountApiService.getAccount().pipe(
      first(),
      switchMap((res) => {
        console.log('Here ', res);
        this.accountSubject.next(res.data);
        return this.account$;
      })
    );
  }

  /**
   * update account and pushes to account$ stream
   *
   * @param {Partial<IAccount>} data
   * @memberof AccountDataService
   */
  updateAccount(data: Partial<IAccount>) {
    this.accountSubject.next({
      ...(this.accountSubject.getValue() ?? ({} as IAccount)),
      ...data,
    });
  }

  /**
   * validate and create new transaction then updates account data
   *
   * @param {number} amount
   * @param {IMerchant} to
   * @memberof AccountDataService
   */
  transfer(amount: number, to: Partial<IMerchant>) {
    if (this.isValidTransfer(amount)) {
      const account = this.accountSubject.getValue();
      this.updateAccount({
        currentBalance: account.currentBalance - amount,
      });
      this.transactionService.createTransaction(amount, to);
    }
  }

  /**
   * check if the transfer amount is valid
   *
   * @param {number} amount
   * @returns {boolean}
   * @memberof AccountDataService
   */
  isValidTransfer(amount: number): boolean {
    const account = this.accountSubject.getValue();
    const balanceAfterTransfer = account.currentBalance - amount;
    if (balanceAfterTransfer > -500) {
      return true;
    }
    return false;
  }
}
