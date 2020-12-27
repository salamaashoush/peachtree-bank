import { ReactiveFormsModule } from '@angular/forms';
import { TestIdPipe } from '../test-id.pipe';
import { TransferFormComponent } from './transfer-form.component';

export default {
  title: 'TransferFormComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [ReactiveFormsModule],
    declarations: [TestIdPipe],
  },
  component: TransferFormComponent,
  props: {
    merchantNames: ['H&M store', 'Backbase'],
    account: {
      name: 'Free Checking',
      number: '4692',
      currentBalance: 5824.76,
      currencyCode: 'EUR',
    },
  },
});
