import React, { useState, useRef } from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition/transition";
import { OptionProps } from './option';

type SelectSize = 'lg' | 'sm' | 'md'

type SelectMode = 'single' | 'multiple'

type SelectCallback = (selectedValue: string) => void

interface ISelectContext {
    value?: string,
    onSelect?: SelectCallback,
    mode?: string
}

export const SelectContext = React.createContext<ISelectContext>({ value: '' })

export interface SelectProps {
    className?: string,
    style?: React.CSSProperties,
    size?: SelectSize,
    mode?: SelectMode,
    onSelect?: SelectCallback
}

export const Select: React.FC<SelectProps> = (props) => {
    const {
        className,
        style,
        size,
        mode,
        children,
        onSelect
    } = props

    const componentRef = useRef<HTMLDivElement>(null)

    useClickOutside(componentRef, () => setShowDropDown(false))

    const [value, setValue] = useState('')
    const [showDropDown, setShowDropDown] = useState(false)

    const handleOptionClick = (value: string) => {
        setValue(value)
        setShowDropDown(false)
        if (onSelect) {
            onSelect(value)
        }
    }

    const handleClick = () => {
        setShowDropDown(!showDropDown)
    }

    const passedContext: ISelectContext = {
        value: value || '',
        onSelect: handleOptionClick,
        mode,
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<OptionProps>
            const { displayName } = childElement.type
            if (displayName === 'Option') {
                return React.cloneElement(childElement, {
                    value: childElement.props.children
                })
            } else {
                // map不会返回undefined和null
                console.error('Warning: Select has a child which is not a Option component')
            }
        })
    }

    const classes = classNames('wave-select-component', className, {
        [`select-${size}`]: size,
        'select-single': mode === 'single',
        'select-multiple': mode === 'multiple',
        'is-focus': showDropDown
    })

    return (
        <SelectContext.Provider value={passedContext}>
            <div className="wave-select-wrapper">
                <div className={classes} style={style} ref={componentRef} onClick={handleClick}>
                    {value}
                    <Icon className="wave-select-icon" icon={showDropDown?'angle-up':'angle-down'}></Icon>
                </div>
                <Transition
                    in={showDropDown}
                    timeout={500}
                    animation="zoom-in-right"
                >
                    <ul className="wave-select-list">
                        {renderChildren()}
                    </ul>
                </Transition>
            </div>
        </SelectContext.Provider>
    )
}

Select.displayName = 'Select'
Select.defaultProps = {
    mode: 'single',
    size: 'md'
}