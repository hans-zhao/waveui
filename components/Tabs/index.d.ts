import { TabsProps } from "./tabs";
import { TabItemProps } from "./tabItem";
import { FC } from "react";
declare type TabsComponent = FC<TabsProps> & {
    Item: FC<TabItemProps>;
};
declare const transTabs: TabsComponent;
export default transTabs;
