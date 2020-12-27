import { text } from '@storybook/addon-knobs';
import { TestIdPipe } from '../test-id.pipe';
import { LoaderComponent } from './loader.component';

export default {
  title: 'LoaderComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [],
    declarations: [TestIdPipe],
  },
  component: LoaderComponent,
  props: {
    message: text('message', 'Loading...'),
  },
});
