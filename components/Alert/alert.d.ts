import React from "react";
declare type AlertType = 'success' | 'default' | 'danger' | 'warning';
interface alertProps {
    className?: string;
    type?: AlertType;
    closeable?: boolean;
    title?: string;
    description?: string;
    children?: React.ReactNode;
    close?: () => void;
}
export declare const Alert: React.FC<alertProps>;
export {};
