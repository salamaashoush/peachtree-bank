import { text } from '@storybook/addon-knobs';
import { TestIdPipe } from '../test-id.pipe';
import { PanelComponent } from './panel.component';

export default {
  title: 'PanelComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [],
    declarations: [TestIdPipe],
  },
  component: PanelComponent,
  props: {
    title: text('title', 'Untitled Panel'),
    icon: text('icon', '/assets/icons/arrows.png'),
  },
});
