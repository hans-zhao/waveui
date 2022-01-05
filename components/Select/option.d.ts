import React from "react";
export interface OptionProps {
    className?: string;
    style?: React.CSSProperties;
    value: string;
    disabled?: boolean;
    children?: string;
}
export declare const Option: React.FC<OptionProps>;
