import { getDefaultTransactionItem } from '@backbase/api-client';
import { Transaction } from '@backbase/data';
import { TestIdPipe } from '../test-id.pipe';
import { TransactionItemComponent } from './transaction-item.component';

export default {
  title: 'TransactionItemComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [],
    declarations: [TestIdPipe],
  },
  component: TransactionItemComponent,
  props: { transaction: new Transaction(getDefaultTransactionItem()) },
});
