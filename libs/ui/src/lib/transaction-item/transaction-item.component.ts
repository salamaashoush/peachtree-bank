import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { Transaction } from '@backbase/data';

@Component({
  selector: 'backbase-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionItemComponent {
  @Input() transaction: Transaction;
}
