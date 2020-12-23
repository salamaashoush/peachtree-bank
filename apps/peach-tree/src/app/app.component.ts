import { Component, OnInit } from '@angular/core';
import { IOrderBy, TransactionDataService } from '@backbase/data';
import { first } from 'rxjs/operators';

@Component({
  selector: 'backbase-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public transactionsDataService: TransactionDataService) {}

  ngOnInit(): void {
    console.log('here');
    this.transactionsDataService.fetchAll().pipe(first()).subscribe();
    this.transactionsDataService.transaction$.subscribe((data) => {
      console.log(data);
    });
  }

  handleSort(sort: IOrderBy) {
    this.transactionsDataService.updateSort(sort);
  }
  handleSearch(search: string) {
    this.transactionsDataService.updateSearch(search);
  }
}
