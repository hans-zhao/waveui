import React from "react";
declare type SelectCallback = (index: string) => void;
declare type TabsMode = 'border' | 'card';
export interface TabsProps {
    className?: string;
    style?: React.CSSProperties;
    defaultIndex?: string;
    onSelect?: SelectCallback;
    mode?: TabsMode;
}
interface ITabsContext {
    index: string;
    onSelect?: SelectCallback;
}
export declare const TabsContext: React.Context<ITabsContext>;
export declare const Tabs: React.FC<TabsProps>;
export {};
