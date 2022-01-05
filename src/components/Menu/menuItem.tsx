import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  className?: string,
  style?: React.CSSProperties,
  // index是必须的，但是应该自动生成且用户不可控制
  index?: string,
  disabled?: boolean
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    className,
    style,
    index,
    disabled,
    children
  } = props

  const context = useContext(MenuContext)

  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  })

  const handleClick = () => {
    // typeof a === 'number' 代替 a || a === 0
    if (context.onSelect && !disabled && index) {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick} key={index}>
      {children}
    </li>
  )
}

MenuItem.defaultProps = {
  disabled: false
}

MenuItem.displayName = 'MenuItem'
export default MenuItem