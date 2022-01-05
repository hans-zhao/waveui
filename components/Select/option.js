import React, { useContext } from "react";
import classNames from "classnames";
import { SelectContext } from "./select";
export var Option = function (props) {
    var className = props.className, style = props.style, value = props.value, disabled = props.disabled, children = props.children;
    var context = useContext(SelectContext);
    var classes = classNames('wave-option-item', className, {
        'is-disabled': disabled,
        'is-active': context.value === value
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && value) {
            context.onSelect(value);
        }
    };
    return (React.createElement("li", { className: classes, style: style, onClick: handleClick, key: value }, children));
};
Option.defaultProps = {
    disabled: false
};
Option.displayName = 'Option';
