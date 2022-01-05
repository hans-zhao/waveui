import React from "react";
export interface TabItemProps {
    index?: string;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    children?: React.ReactNode;
    label?: React.ReactNode;
}
declare const TabItem: React.FC<TabItemProps>;
export default TabItem;
