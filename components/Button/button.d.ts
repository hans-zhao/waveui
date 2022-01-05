import React from 'react';
declare type ButtonSize = 'lg' | 'sm' | 'md';
declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    /**
     * Button class
     */
    className?: string;
    /**
     * Button type
     */
    btnType?: ButtonType;
    /**
     * How large should the button be?
     */
    size?: ButtonSize;
    /**
     * Is button disabled?
     */
    disabled?: boolean;
    /**
     * Button contents
     */
    children?: React.ReactNode;
    /**
     * Link href
     */
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
declare type NativeAnchorProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & NativeAnchorProps>;
/**
 * Primary UI component for user interaction
 */
export declare const Button: React.FC<ButtonProps>;
export {};
