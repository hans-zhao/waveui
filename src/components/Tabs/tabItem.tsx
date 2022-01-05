import React, { useContext } from "react";
import classNames from "classnames";
import { TabsContext } from "./tabs";

export interface TabItemProps {
  index?: string,
  className?: string,
  style?: React.CSSProperties,
  disabled?: boolean,
  children?: React.ReactNode,
  label?: React.ReactNode // 默认显示index
}

const TabItem: React.FC<TabItemProps> = (props) => {
  const {
    index,
    className,
    style,
    disabled,
    label
  } = props

  const context = useContext(TabsContext)

  const classes = classNames('tab-item', className, {
    'is-active': index === context.index,
    'is-disabled': disabled
  })

  const handleClick = () => {
    if (context.onSelect && index && !disabled) {
      context.onSelect(index)
    }
  }

  return (
    <li style={style} key={index} className={classes} onClick={handleClick}>
      {label || index}
    </li>
  )
}

TabItem.defaultProps = {
  disabled: false
}

TabItem.displayName = 'TabItem'

export default TabItem


