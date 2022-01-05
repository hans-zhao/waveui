import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Icon from '../../components/Icon/icon';
import { Upload } from './upload';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Library/Upload Component',
    component: Upload,
    parameters: {
    },
    argTypes: {
    },
} as ComponentMeta<typeof Upload>;

const Template: ComponentStory<typeof Upload> = (args) => {
    const handleBeforeUpload = (file: File) => {
        // const { size, type } = file
        // console.log('size:', size, 'type:', type)
        return Promise.resolve(file)
    }
    return (
        <Upload
        // 注意文件尺寸要尽量的小
            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
            onBeforeUpload={handleBeforeUpload}
            onChange={action('change')}
            onProgress={action('progress')}
            onSuccess={action('success')}
            onError={action('error')}
            name='imgFile'
            multiple
            accept='image/*'
            // accept='.jpg,.png'
            headers={{'X-Powered-By': 'wave'}}
            drag
        >
            <Icon icon="upload" size="5x" theme="secondary" />
        </Upload>
    )
}

export const upload = Template.bind({});
upload.storyName = 'Upload';
upload.args = {

};



