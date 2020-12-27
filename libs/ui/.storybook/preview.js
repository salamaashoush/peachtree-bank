import '!style-loader!css-loader!sass-loader!../src/assets/utils.scss';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator } from '@storybook/angular';
addDecorator(withKnobs);
