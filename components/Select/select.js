import React, { useState, useRef } from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition/transition";
export var SelectContext = React.createContext({ value: '' });
export var Select = function (props) {
    var _a;
    var className = props.className, style = props.style, size = props.size, mode = props.mode, children = props.children, onSelect = props.onSelect;
    var componentRef = useRef(null);
    useClickOutside(componentRef, function () { return setShowDropDown(false); });
    var _b = useState(''), value = _b[0], setValue = _b[1];
    var _c = useState(false), showDropDown = _c[0], setShowDropDown = _c[1];
    var handleOptionClick = function (value) {
        setValue(value);
        setShowDropDown(false);
        if (onSelect) {
            onSelect(value);
        }
    };
    var handleClick = function () {
        setShowDropDown(!showDropDown);
    };
    var passedContext = {
        value: value || '',
        onSelect: handleOptionClick,
        mode: mode,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'Option') {
                return React.cloneElement(childElement, {
                    value: childElement.props.children
                });
            }
            else {
                // map不会返回undefined和null
                console.error('Warning: Select has a child which is not a Option component');
            }
        });
    };
    var classes = classNames('wave-select-component', className, (_a = {},
        _a["select-" + size] = size,
        _a['select-single'] = mode === 'single',
        _a['select-multiple'] = mode === 'multiple',
        _a['is-focus'] = showDropDown,
        _a));
    return (React.createElement(SelectContext.Provider, { value: passedContext },
        React.createElement("div", { className: "wave-select-wrapper" },
            React.createElement("div", { className: classes, style: style, ref: componentRef, onClick: handleClick },
                value,
                React.createElement(Icon, { className: "wave-select-icon", icon: showDropDown ? 'angle-up' : 'angle-down' })),
            React.createElement(Transition, { in: showDropDown, timeout: 500, animation: "zoom-in-right" },
                React.createElement("ul", { className: "wave-select-list" }, renderChildren())))));
};
Select.displayName = 'Select';
Select.defaultProps = {
    mode: 'single',
    size: 'md'
};
