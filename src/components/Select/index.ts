import { FC } from "react";
import { Select, SelectProps } from "./select";
import  { Option, OptionProps } from './option';

type SelectComponent = FC<SelectProps> & {
  Option: FC<OptionProps>
}

const transSelect = Select as SelectComponent
transSelect.Option = Option

export default transSelect