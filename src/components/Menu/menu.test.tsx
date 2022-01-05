import React from "react";
import { fireEvent, render, RenderResult, waitFor } from "@testing-library/react";

import { Menu, MenuProps } from './menu';
import MenuItem from './menuItem'
import SubMenu from './subMenu'

// Transition、Icon组件需要转化或者取消
jest.mock('../Icon/icon', () => {
  return () => {
    return <i className="fa" />
  }
})
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props: any) => {
      return props.children
    }
  }
})
const testProps: MenuProps = {
  defaultIndex: '0',
  className: 'wv',
  onSelect: jest.fn()
}

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
  defaultOpenSubMenus: ['4']
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <MenuItem>
        xyz
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>
          opened1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}

// 创建css
const createStyleFile = () => {
  const cssFile: string = `
    .wave-submenu {
      display: none;
    }
    .wave-submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  // style.setAttribute('type', 'text/css')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

// RenderResult
let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement,
  activeElement: HTMLElement, disabledElement: HTMLElement

describe('test menu and menuItem component', () => {
  // beforeEach 在it之前执行，避免重复代码
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    // 由于menu没有文本，只能使用id class的方法获取，推荐使用data-testid

    // wrapper.container获取HTML
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render correct menu and menuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('wave-menu wv')
    // expect(menuElement.getElementsByTagName('li').length).toBe(3)
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })

  it('click items should change active and call correct callback', () => {
    // 注意一定要模拟用户行为
    const thirdItem = wrapper.getByText('xyz')
    expect(thirdItem).toBeInTheDocument()
    // 模拟用户点击第三个，active从第一个切换到第三个
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')

    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalled()
  })

  it('should show dropdown items when mode equal to horizontal and hover on subMenu', async () => {
    // queryByText 与 getByText 区别：queryByText针对可能获取值为空的类型
    const dropdownElement = wrapper.getByText('dropdown')
    // 必须控制css
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    // display的元素仍然可以fireEvent
    fireEvent.mouseEnter(dropdownElement)
    // mouseEnter 的回调中存在 setTimeout 异步
    await waitFor(() => {
      expect(wrapper.getByText('drop1')).toBeVisible()
    })
    // 点击触发 onSelect
    const dropItem = wrapper.getByText('drop1')
    fireEvent.click(dropItem)
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    // mouseLeave
    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => {
      expect(wrapper.getByText('drop1')).not.toBeVisible()
    })
  })
})

// mode要区分dom来测试，否则会互相干扰，
// 不要用 cleanup
describe('test menu and menuItem component in vertical mode', () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerticalProps))
    wrapper2.container.append(createStyleFile())
  })
  it('should render vertical mode when mode set to vertical', () => {
    const menuElement = wrapper2.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })

  it('should show dropdown items when click subMenu in vertical mode', () => {
    const dropdownElement = wrapper2.getByText('dropdown')
    const dropItem = wrapper.getByText('drop1')
    expect(dropItem).not.toBeVisible()
    fireEvent.click(dropdownElement)
    expect(dropItem).toBeVisible()
  })

  it('should show dropdown items when defaultOpenSubMenus contains submenu index', () => {
    const openedItem = wrapper2.getByText('opened1')
    expect(openedItem).toBeVisible()
  })
})