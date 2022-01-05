import React from "react";
declare type SelectSize = 'lg' | 'sm' | 'md';
declare type SelectMode = 'single' | 'multiple';
declare type SelectCallback = (selectedValue: string) => void;
interface ISelectContext {
    value?: string;
    onSelect?: SelectCallback;
    mode?: string;
}
export declare const SelectContext: React.Context<ISelectContext>;
export interface SelectProps {
    className?: string;
    style?: React.CSSProperties;
    size?: SelectSize;
    mode?: SelectMode;
    onSelect?: SelectCallback;
}
export declare const Select: React.FC<SelectProps>;
export {};
