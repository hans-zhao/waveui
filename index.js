// 暴露全部组件
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
export { default as Button } from "./components/Button";
export { default as Menu } from './components/Menu';
export { default as Icon } from './components/Icon';
export { default as Tabs } from './components/Tabs';
export { default as Select } from './components/Select';
export { default as AutoComplete } from './components/AutoComplete';
export { default as Upload } from './components/Upload';
