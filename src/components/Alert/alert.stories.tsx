import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Alert } from './alert';
// import { action } from '@storybook/addon-actions';


export default {
  title: 'Library/Alert Component',
  component: Alert,
  parameters: {
    info: {
      text: ` 
      ## this is a nice component
      ~~~js
        const component = 'alert'
      ~~~
    `,
    }
  },
  argTypes: {

  },
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const alert = Template.bind({});
alert.storyName = 'Alert';
alert.args = {
  type: 'danger',
  closeable: true,
  title: 'danger！！',
  description: 'run for your life right now !'
};

