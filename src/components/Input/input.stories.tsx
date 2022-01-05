import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from './input';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Library/Input Component',
    component: Input,
    parameters: {
    },
    argTypes: {
    },
} as ComponentMeta<typeof Input>;

// const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

// 注意 全局的 ReactElement（比如 Template） 只能写一个，
// 否则storybook会错误识别多个组件（根据全局ReactElement的数量）
const Template: ComponentStory<typeof Input> = (args) => {
    const [value, setValue] = useState('')
    return (
        <div>
            {/* default */}
            <Input {...args} />
            {/* 受控组件 */}
            <Input value={value} defaultValue={value} onChange={(e) => setValue(e.target.value)}></Input>
        </div>
    )
}

export const defaultInput = Template.bind({});
defaultInput.storyName = 'Default Input';
defaultInput.args = {
    style: { width: '300px' },
    placeholder: 'placeholder',
    onChange: action('change')
};

export const disabledInput = Template.bind({});
disabledInput.storyName = 'Disabled Input';
disabledInput.args = {
    style: { width: '300px' },
    // placeholder: 'placeholder',
    disabled: true,
    onChange: action('change')
};




