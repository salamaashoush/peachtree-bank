import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'backbase-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
