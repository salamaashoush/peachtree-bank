import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'backbase-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent implements OnInit {
  @Output() searchChange = new EventEmitter<string>(true);
  public searchControl = new FormControl();

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((value) => {
      this.searchChange.emit(value);
    });
  }

  handleClear() {
    this.searchControl.setValue('');
  }
}
