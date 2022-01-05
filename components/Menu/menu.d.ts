import React from "react";
declare type MenuMode = 'horizontal' | 'vertical';
declare type SelectCallback = (selectedIndex: string) => void;
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: string;
    defaultOpenSubMenus?: Array<string>;
}
export declare const MenuContext: React.Context<IMenuContext>;
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    style?: React.CSSProperties;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
    onSelect?: SelectCallback;
}
export declare const Menu: React.FC<MenuProps>;
export {};
