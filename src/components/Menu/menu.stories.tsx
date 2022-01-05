import React from "react";
import { Menu } from "./menu";
import SubMenu from "./subMenu";
import MenuItem from "./menuItem";
// import { action } from '@storybook/addon-actions';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Library/Menu Component',
  component: Menu,
  argTypes: {
    // mode: {
    //   options: ['vertical', 'horizontal'],
    //   control: 'radio'
    // },
  },
  parameters: {
    // actions: {
    //   handles: ['click'],
    // },
  },
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem disabled>
      disabled
    </MenuItem>
    <MenuItem>
      cool link 2
    </MenuItem>
    <SubMenu title="二级菜单">
      <MenuItem disabled>
        二级 disabled
      </MenuItem>
      <MenuItem>
        二级 cool link 2
      </MenuItem>
    </SubMenu>
  </Menu>
);

export const menu = Template.bind({});
menu.args = {
  // mode: 'vertical',
  // onSelect: action('clicked item')
};
menu.storyName = 'Menu';

