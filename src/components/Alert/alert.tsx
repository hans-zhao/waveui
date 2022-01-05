import React, { useState } from "react";
import classnames from 'classnames';
import Transition from '../Transition/transition'
import Icon from '../Icon/icon'

type AlertType = 'success' | 'default' | 'danger' | 'warning'

// alert-default
// 注意对于js而言，是直接操作node而非dom
interface alertProps {
  className?: string,
  type?: AlertType,
  closeable?: boolean,
  title?: string,
  description?: string,
  children?: React.ReactNode,
  close?: () => void
}


export const Alert: React.FC<alertProps> = (props) => {
  const {
    className,
    type,
    closeable,
    title,
    description,
    children,
    close
  } = props

  const [alertShow, setShow] = useState(true)

  const handleClose = () => {
    if (close) close()
    setShow(false)
  }

  const classes = classnames('alert', className, {
    [`alert-${type}`]: type,
    'alert-show': !alertShow
  })
  // children覆盖description
  return (
    <Transition
      in={alertShow}
      timeout={500}
      animation="zoom-in-left"
    >
      <div
        className={classes}
      >
        {closeable &&
          <span className="alert-closebtn" onClick={() => handleClose()}>
            <Icon icon='window-close' className="window-close"></Icon>
          </span>}
        {title && <div className="alert-title">{title}</div>}
        {children ? <div>{children}</div> : (description && <div>{description}</div>)}
      </div>
    </Transition>
  )
}

Alert.defaultProps = {
  type: 'default',
  closeable: true,
}


