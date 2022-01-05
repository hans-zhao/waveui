import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
var MenuItem = function (props) {
    var className = props.className, style = props.style, index = props.index, disabled = props.disabled, children = props.children;
    var context = useContext(MenuContext);
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    var handleClick = function () {
        // typeof a === 'number' 代替 a || a === 0
        if (context.onSelect && !disabled && index) {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleClick, key: index }, children));
};
MenuItem.defaultProps = {
    disabled: false
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
