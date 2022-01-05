import React, { ChangeEvent } from "react";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type InputSize = 'sm' | 'lg' | 'md';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLElement>, "size"> {
    /**
     * How large should the input be?
     */
    size?: InputSize;
    /**
     * Is input disabled?
     */
    disabled?: boolean;
    /**
     * Input图标
     */
    icon?: IconProp;
    /**
     * Input前缀
     */
    prepend?: string | React.ReactElement;
    /**
     * Input后缀
     */
    append?: string | React.ReactElement;
    /**
     * Input onChange
     */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * Input组件
 */
export declare const Input: React.FC<InputProps>;
export {};
