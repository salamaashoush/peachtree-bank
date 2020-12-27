import { TestIdPipe } from '../test-id.pipe';
import { SortBarComponent } from './sort-bar.component';

export default {
  title: 'SortBarComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [],
    declarations: [TestIdPipe],
  },
  component: SortBarComponent,
  props: {},
});
