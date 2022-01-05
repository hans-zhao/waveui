import React from "react";
import { InputProps } from "../Input/input";
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /**
     * 抓取数据
     */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /**
     * 自定义模板
     */
    renderOption?: (item: DataSourceType) => React.ReactElement;
    /**
     * select 事件
     */
    onSelect?: (item: DataSourceType) => void;
}
/**
 * AutoComplete 组件
 */
export declare const AutoComplete: React.FC<AutoCompleteProps>;
export {};
