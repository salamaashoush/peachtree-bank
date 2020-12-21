import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'backbase-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
