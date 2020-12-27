import { ReactiveFormsModule } from '@angular/forms';
import { TestIdPipe } from '../test-id.pipe';
import { SearchBoxComponent } from './search-box.component';

export default {
  title: 'SearchBoxComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [ReactiveFormsModule],
    declarations: [TestIdPipe],
  },
  component: SearchBoxComponent,
  props: {},
});
