import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortBarComponent } from './sort-bar/sort-bar.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionItemComponent } from './transaction-item/transaction-item.component';
import { SectionCardComponent } from './section-card/section-card.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SortBarComponent, SearchBoxComponent, TransactionListComponent, TransactionItemComponent, SectionCardComponent, TransferFormComponent],
})
export class UiModule {}
