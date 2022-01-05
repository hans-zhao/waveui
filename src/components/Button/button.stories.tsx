import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './button';
// import { action } from '@storybook/addon-actions';


// 不同的写法不能一起用 storiesOf 官方已经不推荐
// const defaultButton = () => (<Button onClick={action('default button click')}>default button</Button>)
// storiesOf('Library/按钮', module).add('默认 Button', defaultButton)

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Library/Button Component',
  component: Button,
  parameters: {
    actions: {
      handles: ['click .btn'],
    },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // More on controls: https://storybook.js.org/docs/react/essentials/controls
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const defaultButton = Template.bind({});
defaultButton.storyName = '默认按钮';
defaultButton.args = {
  children: 'default button'
};

export const disabledButton = Template.bind({});
disabledButton.storyName = '禁用按钮';
disabledButton.args = {
  disabled: true,
  children: 'disabled button'
};

export const primaryButton = Template.bind({});
primaryButton.storyName = '主要按钮';
primaryButton.args = {
  btnType: 'primary',
  children: 'primary button'
};

export const dangerButton = Template.bind({});
dangerButton.storyName = '危险按钮';
dangerButton.args = {
  btnType: 'danger',
  children: 'danger button'
};

export const linkButton = Template.bind({});
linkButton.storyName = '外链按钮';
linkButton.args = {
  btnType: 'link',
  href: 'http://www.baidu.com/',
  children: 'link button'
};

export const smallButton = Template.bind({});
smallButton.storyName = '小型按钮';
smallButton.args = {
  size: 'sm',
  children: 'small button'
};

export const largeButton = Template.bind({});
largeButton.storyName = '大型按钮';
largeButton.args = {
  size: 'lg',
  children: 'large button'
};