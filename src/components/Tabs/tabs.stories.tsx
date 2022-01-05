import React from "react";
import { Tabs } from "./tabs";
import TabItem from "./tabItem";
import { action } from '@storybook/addon-actions';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Library/Tabs Component',
    component: Tabs,
    argTypes: {
    },
    parameters: {
    },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => (
    <Tabs onSelect={action('clicked')} {...args}>
        <TabItem label={<span>label-1</span>}>
            <p>active</p>
        </TabItem>
        <TabItem label='label-2' disabled>
            render doesn't work here
        </TabItem>
        <TabItem>
            <h2>xyz</h2>
        </TabItem>
    </Tabs>
);

export const tabs = Template.bind({});
tabs.args = {
    defaultIndex: '0',
    mode: 'card'
};
tabs.storyName = 'Tabs';

