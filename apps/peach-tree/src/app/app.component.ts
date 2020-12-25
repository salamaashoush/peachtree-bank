import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  AccountDataService,
  IOrderBy,
  MerchantDataService,
  TransactionDataService,
} from '@backbase/data';
import { ITransferFormData } from '@backbase/ui';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'backbase-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public merchantNames$: Observable<string[]>;
  public isLoading$ = new BehaviorSubject<boolean>(true);

  constructor(
    public transactionService: TransactionDataService,
    public accountService: AccountDataService,
    public merchantService: MerchantDataService
  ) {
    this.merchantNames$ = this.merchantService.getNames();
  }

  ngOnInit(): void {
    combineLatest([
      this.accountService.fetchAccount(),
      this.transactionService.fetchAll(),
      this.merchantService.fetchAll(),
    ])
      .pipe(first())
      .subscribe(() => {
        this.isLoading$.next(false);
      });
  }

  handleSort(sort: IOrderBy) {
    this.transactionService.updateSort(sort);
  }

  handleSearch(search: string) {
    this.transactionService.updateSearch(search);
  }

  handleTransfer(data: ITransferFormData) {
    this.merchantService
      .getByName(data.toAccount)
      .pipe(first())
      .subscribe((merchant) => {
        const merchantData = merchant ?? { name: data.toAccount };
        this.accountService.transfer(data.amount, merchantData);
      });
  }

  amountValidatorFn = (control: AbstractControl) => {
    const isValid = this.accountService.isValidTransfer(control.value);
    return !isValid
      ? { notEnoughBalance: `You don't have enough balance in your account` }
      : null;
  };
}
