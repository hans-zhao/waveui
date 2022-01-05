// 提取这个组件最重要的是 提取重复的css代码
import React from "react";
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

// 定义css名，如果没有传递，则使用默认值
type AnimationName = 'zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-left' | 'zoom-in-right'

type TransitionProps = {
  animation?: AnimationName,
  wrapper?: boolean // 容器，用于分离样式，比如 transition 避免覆盖
  
} & CSSTransitionProps

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    animation,
    children,
    classNames,
    wrapper,
    ...restProps
  } = props

  return (
    <CSSTransition
      classNames={animation || classNames}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
}

export default Transition

