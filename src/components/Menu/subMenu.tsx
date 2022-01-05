import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from './menuItem'
import Icon from '../../components/Icon/icon';
// import { CSSTransition } from 'react-transition-group'
import Transition from "../Transition/transition";
export interface SubMenuProps {
  index?: string,
  className?: string,
  // 标题
  title: string
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const {
    index,
    className,
    title,
    children
  } = props
  const context = useContext(MenuContext)

  // console.log('xxx', context.defaultOpenSubMenus)
  // 注意as断言 并不能确保defaultOpenSubMenus 一定存在
  const defaultOpenSubMenus = context.defaultOpenSubMenus as string[]
  const isOpened = (index && context.mode === 'vertical') ? defaultOpenSubMenus.includes(index) : false

  const [menuOpen, setMenuOpen] = useState(isOpened)

  const classes = classNames('menu-item', 'submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  })

  // vertical click
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()
    setMenuOpen(!menuOpen)
  }

  // horizontal hover
  // 虽然有动画控制，但是定时器必须要使用，否则动画会出问题
  // 可能原因是加入动画时的reflow
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    e.nativeEvent.stopImmediatePropagation()
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 300);
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}

  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) },
  } : {}

  const childrenClasses = classNames('wave-submenu', {
    'menu-opened': menuOpen
  })

  // SubMenu 包裹 MenuItem，需要特殊处理
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        // 采用cloneElement 来控制 children
        // 使用 '1-1'的字符串 来避免 Menu与SubMenu 的index冲突
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      } else {
        // map不会返回undefined和null
        console.error('Warning: SubMenu has a child which is not a MenuItem component')
      }
    })
    return (
      <Transition
        in={menuOpen}
        timeout={300}
        animation='zoom-in-left'
      >
        <ul className={childrenClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    )
    /* { <CSSTransition
       // in:TRUE入场 FALSE出场
       in={menuOpen}
       // timeout和css动画里面的时间的区别：
       // enter-active控制动画渐变的时间
       // timeout控制css中enter-done开始出现的时间(同时删除enter enter-active的样式)
       // 如果timeout太短，动画就来不及执行，
       // 一般二者保持相同即可（注意delay时间）
       timeout={300}
       classNames='zoom-in-top'
       // appear表示首次渲染必须动画（比如初始menuOpen为TRUE，仍然执行隐藏->显示动画）
       appear
       // timeout结束后卸载节点，避免opacity===0时dom仍然存在
       unmountOnExit
     >
       <ul className={childrenClasses}>
         {childrenComponent}
       </ul>
     </CSSTransition> }*/
  }

  return (
    <li className={classes} key={index} {...hoverEvents}>
      <div
        className="submenu-title"
        {...clickEvents}
      >
        {title}
        <Icon icon='angle-down' className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu