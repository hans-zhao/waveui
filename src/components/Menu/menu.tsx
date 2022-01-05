import React, { useState, createContext } from "react";
import classNames from "classnames";
import { MenuItemProps } from './menuItem'

// 由于没有办法直接props传递index onSelect，因此使用context

// 使用联合类型代替枚举
type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

// context需要index onSelect
interface IMenuContext {
  index: string,
  onSelect?: SelectCallback,
  mode?: string,
  defaultOpenSubMenus?: Array<string>
}
// 创建contex
export const MenuContext = createContext<IMenuContext>({ index: '0' })

export interface MenuProps {
  defaultIndex?: string,
  className?: string,
  style?: React.CSSProperties,
  mode?: MenuMode,
  // vertical 默认展开某些 subMenu
  defaultOpenSubMenus?: string[] // Array<string>
  onSelect?: SelectCallback
}

export const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    style,
    mode,
    children,
    defaultIndex,
    defaultOpenSubMenus,
    onSelect
  } = props

  const [currentActive, setActive] = useState(defaultIndex)

  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }

  const classes = classNames('wave-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })

  // 需要 Menu组件 children 只能是MenuItem，否则不渲染错误节点并在控制台提示错误
  // 因此可以考虑children.map  但是children 不透明，不能直接遍历，采用React.Children.map来操作
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      // console.log('***', child, index)
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if(displayName === 'MenuItem' || displayName === 'SubMenu') {
        // 采用cloneElement 来控制 children
        return React.cloneElement(childElement, {
          index: index.toString()
        })
      } else {
        // map不会返回undefined和null
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  return (
    <MenuContext.Provider value={passedContext}>
      <ul className={classes} style={style} data-testid='test-menu'>
        {renderChildren()}
      </ul>
    </MenuContext.Provider>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  defaultOpenSubMenus: [],
  mode: 'horizontal'
}