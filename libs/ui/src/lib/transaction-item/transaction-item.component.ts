import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'backbase-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
