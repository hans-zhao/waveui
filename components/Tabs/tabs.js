import React, { useState, createContext } from "react";
import classNames from "classnames";
export var TabsContext = createContext({
    index: '0'
});
export var Tabs = function (props) {
    var className = props.className, style = props.style, defaultIndex = props.defaultIndex, mode = props.mode, onSelect = props.onSelect, children = props.children;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    // 样式可以全部定义在外层
    var classes = classNames('wave-tabs', className, {
        'tabs-border': mode === 'border',
        'tabs-card': mode === 'card'
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: currentActive || '0',
        onSelect: handleClick
    };
    var generateChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childrenElement = child;
            if (childrenElement.type === undefined) {
                console.error('Warning: Tabs has a child which is not a tabItem');
            }
            else {
                var displayName = childrenElement.type.displayName;
                if (displayName === 'TabItem') {
                    return React.cloneElement(childrenElement, {
                        index: index.toString()
                    });
                }
                else {
                    console.error('Warning: Tabs has a child which is not a tabItem');
                }
            }
        });
    };
    var generateContent = function () {
        var content;
        React.Children.forEach(children, function (child, index) {
            var childrenElement = child;
            if (childrenElement.props === undefined) {
                console.error('Warning: Tabs has a child which is not a tabItem');
            }
            else {
                var children_1 = childrenElement.props.children;
                if (index.toString() === currentActive) {
                    content = children_1;
                    return false;
                }
            }
        });
        return content;
    };
    return (React.createElement(TabsContext.Provider, { value: passedContext },
        React.createElement("div", { className: "wave-tabs-wrapper" },
            React.createElement("ul", { style: style, className: classes, "data-testid": 'test-tabs' }, generateChildren())),
        React.createElement("div", { className: "tabs-content" }, generateContent())));
};
Tabs.defaultProps = {
    defaultIndex: '0',
    mode: 'border'
};
