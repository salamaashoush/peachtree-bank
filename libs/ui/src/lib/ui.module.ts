import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { PanelComponent } from './panel/panel.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SortBarComponent } from './sort-bar/sort-bar.component';
import { TestIdPipe } from './test-id.pipe';
import { TransactionItemComponent } from './transaction-item/transaction-item.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    SortBarComponent,
    SearchBoxComponent,
    TransactionItemComponent,
    PanelComponent,
    TransferFormComponent,
    LoaderComponent,
    TestIdPipe,
  ],
  exports: [
    SortBarComponent,
    SearchBoxComponent,
    TransactionItemComponent,
    PanelComponent,
    LoaderComponent,
    TransferFormComponent,
    TestIdPipe,
  ],
})
export class UiModule {}
