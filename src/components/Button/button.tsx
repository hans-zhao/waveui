import React from 'react'
// classnames用于编写class
import classnames from 'classnames'

type ButtonSize = 'lg' | 'sm' | 'md'

type ButtonType = 'primary' | 'default' | 'danger' | 'link'

// button属性
interface BaseButtonProps {
    /**
     * Button class
     */
    className?: string,
    /**
     * Button type
     */
    btnType?: ButtonType,
    /**
     * How large should the button be?
     */
    size?: ButtonSize,
    /**
     * Is button disabled?
     */
    disabled?: boolean,
    /**
     * Button contents
     */
    children?: React.ReactNode, // button上显示的内容
    /**
     * Link href
     */
    href?: string // link
}

// 原生属性
// 类型别名、交叉类型、Partial类型
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type NativeAnchorProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & NativeAnchorProps>


/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = (props) => {
    const {
        className,
        btnType,
        size,
        disabled,
        children,
        href,
        // 所有自带的原生属性
        ...restProps
    } = props
    // 生成class: btn  btn-primary btn-small
    const classes = classnames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        // 注意disabled是button的默认属性，因此
        // 这里只给a添加
        disabled: (btnType === 'link') && disabled
    })
    // 判断button还是a
    if (btnType === 'link' && href) {
        return (
            <a
                className={classes}
                href={href}
                target='_blank'
                rel="noreferrer"
                {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}
// props默认值
Button.defaultProps = {
    btnType: 'default',
    size: 'md',
    disabled: false
}