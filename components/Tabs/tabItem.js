import React, { useContext } from "react";
import classNames from "classnames";
import { TabsContext } from "./tabs";
var TabItem = function (props) {
    var index = props.index, className = props.className, style = props.style, disabled = props.disabled, label = props.label;
    var context = useContext(TabsContext);
    var classes = classNames('tab-item', className, {
        'is-active': index === context.index,
        'is-disabled': disabled
    });
    var handleClick = function () {
        if (context.onSelect && index && !disabled) {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { style: style, key: index, className: classes, onClick: handleClick }, label || index));
};
TabItem.defaultProps = {
    disabled: false
};
TabItem.displayName = 'TabItem';
export default TabItem;
