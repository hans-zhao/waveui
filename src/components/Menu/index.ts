import { FC } from "react";

import { Menu, MenuProps } from "./menu";
import SubMenu, { SubMenuProps } from "./subMenu";
import MenuItem, { MenuItemProps } from "./menuItem";

// 将 SubMenu MenuItem放在 Menu 上便于使用
type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>,
  SubMenu: FC<SubMenuProps>
}

const TransMenu = Menu as IMenuComponent
TransMenu.SubMenu = SubMenu
TransMenu.Item = MenuItem

export default TransMenu