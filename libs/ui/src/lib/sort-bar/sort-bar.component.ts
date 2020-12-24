import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IOrderBy } from '@backbase/data';
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
  @Input() activeSort: IOrderBy = {
    key: 'date',
    order: 'desc',
  };
  @Output() sortChange = new EventEmitter<IOrderBy>(true);

  handleSortChange(key: string) {
    if (this.activeSort.key === key) {
      this.activeSort.order = this.activeSort.order === 'asc' ? 'desc' : 'asc';
    }
    this.activeSort.key = key;
    this.sortChange.emit(this.activeSort);
  }
}
