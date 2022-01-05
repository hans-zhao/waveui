import React, { useContext } from "react";
import classNames from "classnames";
import { SelectContext } from "./select";

export interface OptionProps {
    className?: string,
    style?: React.CSSProperties,
    value: string,
    disabled?: boolean,
    children?: string
}

export const Option: React.FC<OptionProps> = (props) => {
    const {
        className,
        style,
        value,
        disabled,
        children
    } = props

    const context = useContext(SelectContext)

    const classes = classNames('wave-option-item', className, {
        'is-disabled': disabled,
        'is-active': context.value === value
    })
    const handleClick = () => {
        if (context.onSelect && !disabled && value) {
            context.onSelect(value)
        }
    }

    return (
        <li className={classes} style={style} onClick={handleClick} key={value}>
            {children}
        </li>
    )
}

Option.defaultProps = {
    disabled: false
}

Option.displayName = 'Option'