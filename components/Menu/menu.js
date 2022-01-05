import React, { useState, createContext } from "react";
import classNames from "classnames";
// 创建contex
export var MenuContext = createContext({ index: '0' });
export var Menu = function (props) {
    var className = props.className, style = props.style, mode = props.mode, children = props.children, defaultIndex = props.defaultIndex, defaultOpenSubMenus = props.defaultOpenSubMenus, onSelect = props.onSelect;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus
    };
    var classes = classNames('wave-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    });
    // 需要 Menu组件 children 只能是MenuItem，否则不渲染错误节点并在控制台提示错误
    // 因此可以考虑children.map  但是children 不透明，不能直接遍历，采用React.Children.map来操作
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            // console.log('***', child, index)
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // 采用cloneElement 来控制 children
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            }
            else {
                // map不会返回undefined和null
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
    };
    return (React.createElement(MenuContext.Provider, { value: passedContext },
        React.createElement("ul", { className: classes, style: style, "data-testid": 'test-menu' }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    defaultOpenSubMenus: [],
    mode: 'horizontal'
};
