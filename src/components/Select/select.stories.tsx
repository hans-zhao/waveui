import React from "react";
import { Select } from "./select";
import { Option } from "./option";
import { action } from '@storybook/addon-actions';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Library/Select Component',
    component: Select,
    argTypes: {
    },
    parameters: {
    },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => (
    <Select onSelect={action('selected')} {...args}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
            Disabled
        </Option>
        <Option value="Yiminghe">yiminghe</Option>
    </Select>
);

export const select = Template.bind({});
select.args = {
};
select.storyName = 'Select';

