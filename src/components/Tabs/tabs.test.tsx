import React from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { Tabs, TabsProps } from "./tabs";
import TabItem from "./tabItem";

const testProps: TabsProps = {
  defaultIndex: '0',
  className: 'wv',
  mode: 'border',
  onSelect: jest.fn()
}

const testCardProps: TabsProps = {
  defaultIndex: '0',
  mode: 'card'
}

const generateTabs = (props: TabsProps) => {
  return (
    <Tabs {...props}>
      <TabItem label={<span>label-1</span>} className="test-0">
        {/* 注意元素实际渲染位置 */}
        <p>active</p>
      </TabItem>
      <TabItem label='label-2' disabled className="test-1">
        render doesn't work here
      </TabItem>
      <TabItem className="test-2">
        <h2>xyz</h2>
      </TabItem>
    </Tabs>
  )
}

let wrapper: RenderResult, wrapper2: RenderResult, tabsElement: HTMLElement,
  activeElement: HTMLElement, disabledElement: HTMLElement

describe('test Tabs and TabItem component', () => {
  beforeEach(() => {
    wrapper = render(generateTabs(testProps))
    tabsElement = wrapper.getByTestId('test-tabs')
    activeElement = wrapper.container.getElementsByClassName('test-0')[0] as HTMLElement
    disabledElement = wrapper.container.getElementsByClassName('test-1')[0] as HTMLElement
  })
  it('should render correct Tabs and TabItem component based on default props', () => {
    expect(tabsElement).toBeInTheDocument()
    expect(tabsElement).toHaveClass('wave-tabs wv')
    expect(tabsElement.querySelectorAll(':scope > li').length).toEqual(3)

    expect(activeElement).toHaveClass('tab-item is-active')
    expect(disabledElement).toHaveClass('tab-item is-disabled')

    expect(activeElement.innerHTML).toEqual('<span>label-1</span>')
    const thirdItem = wrapper.container.getElementsByClassName('test-2')[0] as HTMLElement
    expect(thirdItem.textContent).toEqual('2')
  })

  it('click items should change active and call correct callback', () => {
    const thirdItem = wrapper.container.getElementsByClassName('test-2')[0] as HTMLElement
    expect(thirdItem).toBeInTheDocument()

    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')

    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  it('should render correct children of TabItem in tabs', () => {
    fireEvent.click(activeElement)
    expect(tabsElement.parentElement?.nextElementSibling?.innerHTML).toEqual('<p>active</p>')
  })
})

describe('test Tabs and TabItem component in card mode', () => {
  beforeEach(() => {
    wrapper2 = render(generateTabs(testCardProps))
  })
  it('should render card mode when mode set to card', () => {
    const tabsElement = wrapper2.getByTestId('test-tabs')
    expect(tabsElement).toHaveClass('tabs-card')
  })
})