import React from "react";
import { ThemeProps } from '../Icon/icon';
interface ProgressProps {
    strokeHeight?: number;
    percent?: number;
    style?: React.CSSProperties;
    showText?: boolean;
    theme?: ThemeProps;
}
export declare const Progress: React.FC<ProgressProps>;
export {};
