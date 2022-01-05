import React from 'react'
import '../src/styles/index.scss'
import { withInfo } from '@storybook/addon-info'

// 引入所有FontAwesomeIcon的图标
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  info: { // info.text用于添加额外的展示信息
    //   text: ` 
    //   ## this is a nice component
    //   ~~~js
    //   const btn = '按钮'
    //   ~~~
    // `,
    inline: true, // 会将addon-info和addon-doc合并在一起展示
    header: false
  },
  // parameters decorators 可以全局（preview.js） 组件全局  单个组件注册
}

export const decorators = [
  withInfo,
  (Story) => (
    <div style={{ padding: '1em' }}>
      <Story />
    </div>
  ),
  (Story) => (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  ),
]