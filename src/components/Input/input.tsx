import React, { ChangeEvent } from "react";
import classnames from 'classnames';
import Icon from "../Icon/icon";
import { IconProp } from '@fortawesome/fontawesome-svg-core'

type InputSize = 'sm' | 'lg' | 'md'


export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLElement>, "size"> {
    /**
     * How large should the input be?
     */
    size?: InputSize,
    /**
     * Is input disabled?
     */
    disabled?: boolean,
    /**
     * Input图标
     */
    icon?: IconProp,
    /**
     * Input前缀
     */
    prepend?: string | React.ReactElement,
    /**
     * Input后缀
     */
    append?: string | React.ReactElement,
    /**
     * Input onChange
     */
    onChange?: (e:ChangeEvent<HTMLInputElement>) => void
}

/**
 * Input组件
 */
export const Input: React.FC<InputProps> = (props) => {
    const {
        disabled,
        size,
        icon,
        prepend,
        append,
        className,
        style,
        ...restProps
    } = props

    // 修复受控组件value初始值为空的情况
    const fixControledInputComponent = (value: any) => {
        if(typeof value === 'undefined' || value === null) {
            return ''
        }
        return value
    }
    if('value' in props) {
        delete restProps.defaultValue
        restProps.value = fixControledInputComponent(props.value)
    }

    const classes = classnames('wave-input-wrapper', className, {
        'is-disabled': disabled,
        [`input-size-${size}`]: size,
        'input-group': prepend || append,
        'input-group-prepend': !!prepend,
        'input-group-append': !!append
    })
    return (
        <div className={classes} style={style}>
            {prepend && <div className="wave-input-group-prepend">{prepend}</div>}
            {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>}
            <input
                className="wave-input-inner"
                disabled={disabled}
                {...restProps}
            />
            {append && <div className="wave-input-group-append">{append}</div>}
        </div>
    )
}

Input.defaultProps = {
    size: 'md',
    disabled: false
}