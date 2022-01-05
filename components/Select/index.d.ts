import { FC } from "react";
import { SelectProps } from "./select";
import { OptionProps } from './option';
declare type SelectComponent = FC<SelectProps> & {
    Option: FC<OptionProps>;
};
declare const transSelect: SelectComponent;
export default transSelect;
