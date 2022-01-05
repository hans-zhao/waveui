import { Tabs, TabsProps } from "./tabs";
import TabItem, { TabItemProps } from "./tabItem";
import { FC } from "react";

type TabsComponent = FC<TabsProps> & {
  Item: FC<TabItemProps>
}

const transTabs = Tabs as TabsComponent
transTabs.Item = TabItem

export default transTabs