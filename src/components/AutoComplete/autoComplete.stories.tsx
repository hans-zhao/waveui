import React from "react";
import { AutoComplete, DataSourceType } from "./autoComplete";
import { action } from '@storybook/addon-actions';

import { ComponentStory, ComponentMeta } from '@storybook/react';

interface dataSourceProps {
  value: string,
  id: number
}

export default {
  title: 'Library/AutoComplete Component',
  component: AutoComplete,
  argTypes: {
  },
  parameters: {
  },
} as ComponentMeta<typeof AutoComplete>;


const Template: ComponentStory<typeof AutoComplete> = (args) => {
  // const dataSource = ['james', 'kobe', 'lily', 'william',
  //   'viking', 'paul', 'hitler', 'jack', 'peter', 'lucy',
  //   'sofia', 'laker']

  /* const dataSource: dataSourceProps[] = [
    { value: 'james', id: 1 },
    { value: 'kobe', id: 2 },
    { value: 'lily', id: 3 },
    { value: 'william', id: 4 },
    { value: 'sofia', id: 5 },
    { value: 'hitler', id: 6 },
    { value: 'lucy', id: 7 }
  ] */
  // 处理字符串
  // const handleFetch = (query: string) => {
  //   return dataSource.filter(name => name.includes(query)).map(name => ({value: name}))
  // }

  // 处理json
  // const handleFetch = (query: string) => {
  //   return dataSource.filter(item => item.value.includes(query))
  // }

  // 使用最新的 fetch api
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json()) // fetch 的标准写法
      .then(({ items }) => {
        return items.slice(0, 10).map((item: any) => ({value: item.login, ...item}))
      })
    // return dataSource.filter(item => item.value.includes(query))
  }

  const renderOption = (item: DataSourceType) => {
    const itemx = item as DataSourceType<dataSourceProps>
    return (
      <>
        <h4>value: {itemx.value}</h4>
        <p>id: {itemx.id}</p>
      </>
    )
  }

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderOption={renderOption}
    ></AutoComplete>
  )
};

export const autoComplete = Template.bind({});
autoComplete.args = {
};
autoComplete.storyName = 'AutoComplete';

