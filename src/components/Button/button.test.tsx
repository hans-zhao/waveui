// 测试挂载
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Button, ButtonProps } from "./button";

/* test('first react test case', () => {
  const wrapper = render(<Button>Nice</Button>)
  const element = wrapper.queryByText('Nice')
  expect(element).toBeTruthy()
  expect(element).toBeInTheDocument()
})
 */
// describe用于给测试分类（测试谁）
// it 和 test 是等价的写法

const defaultProps = {
  onClick: jest.fn()
}
const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'xxoo'
}
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')

    // 测试渲染，注意必须要首先渲染
    expect(element).toBeInTheDocument()
    // 测试是正确的元素 注意大写
    expect(element.tagName).toEqual('BUTTON')
    // 测试默认样式（如果样式显示不正确是css的事情，与组件逻辑无关）
    expect(element).toHaveClass('btn btn-default')
    // 测试默认行为
    // mock模拟按钮点击后的异步回调函数【jest.fn()】，这样就不用写一个真实的回调函数
    // fireEvent手动触发事件
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg xxoo')
  })
  
  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(<Button btnType='link' href="www.dummy.com">Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })

  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>Disabled</Button>)
    const element = wrapper.getByText('Disabled') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    // 测试属性(实例的属性)
    expect(element.disabled).toBeTruthy()
    // 测试click事件无效
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})

