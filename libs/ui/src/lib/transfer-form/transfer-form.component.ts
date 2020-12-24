import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAccount } from '@backbase/api-client';
import { accountToString, currencyCodeToSymbol } from '@backbase/data';
import { ITransferFormData } from '../types';

@Component({
  selector: 'backbase-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferFormComponent implements OnInit, OnChanges {
  public transferForm: FormGroup;
  @Input() merchantNames: string[] = [];
  @Input() account: IAccount;
  @Output() formSubmit = new EventEmitter<ITransferFormData>(true);
  public currencySymbol: string;

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(): void {
    if (this.transferForm) {
      this.transferForm
        .get('fromAccount')
        .setValue(accountToString(this.account));
    }
  }

  ngOnInit(): void {
    this.currencySymbol = currencyCodeToSymbol(this.account.currencyCode);
    this.transferForm = this.formBuilder.group({
      toAccount: ['', Validators.required],
      fromAccount: [{ value: accountToString(this.account), disabled: true }],
      amount: ['0.00', [Validators.required, Validators.min(0.01)]],
    });
  }

  handleFormSubmit() {
    this.formSubmit.emit(this.transferForm.value);
    this.transferForm.reset();
  }
}
