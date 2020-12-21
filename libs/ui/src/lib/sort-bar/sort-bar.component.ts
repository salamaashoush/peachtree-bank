import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ISortBarItem } from '../types';

@Component({
  selector: 'backbase-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortBarComponent {
  @Input() label = 'Sort by';
  @Input() items: ISortBarItem[] = [
    {
      label: 'Date',
      value: 'date',
    },
    { label: 'Beneficiary', value: 'beneficiary' },
    { label: 'Amount', value: 'amount' },
  ];
}
