import { Menu } from "./menu";
import SubMenu from "./subMenu";
import MenuItem from "./menuItem";
var TransMenu = Menu;
TransMenu.SubMenu = SubMenu;
TransMenu.Item = MenuItem;
export default TransMenu;
