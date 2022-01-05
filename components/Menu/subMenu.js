var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import Icon from '../../components/Icon/icon';
// import { CSSTransition } from 'react-transition-group'
import Transition from "../Transition/transition";
var SubMenu = function (props) {
    var index = props.index, className = props.className, title = props.title, children = props.children;
    var context = useContext(MenuContext);
    // console.log('xxx', context.defaultOpenSubMenus)
    // 注意as断言 并不能确保defaultOpenSubMenus 一定存在
    var defaultOpenSubMenus = context.defaultOpenSubMenus;
    var isOpened = (index && context.mode === 'vertical') ? defaultOpenSubMenus.includes(index) : false;
    var _a = useState(isOpened), menuOpen = _a[0], setMenuOpen = _a[1];
    var classes = classNames('menu-item', 'submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    });
    // vertical click
    var handleClick = function (e) {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        setMenuOpen(!menuOpen);
    };
    // horizontal hover
    // 虽然有动画控制，但是定时器必须要使用，否则动画会出问题
    // 可能原因是加入动画时的reflow
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
        timer = setTimeout(function () {
            setMenuOpen(toggle);
        }, 300);
    };
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); },
    } : {};
    var childrenClasses = classNames('wave-submenu', {
        'menu-opened': menuOpen
    });
    // SubMenu 包裹 MenuItem，需要特殊处理
    var renderChildren = function () {
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem') {
                // 采用cloneElement 来控制 children
                // 使用 '1-1'的字符串 来避免 Menu与SubMenu 的index冲突
                return React.cloneElement(childElement, {
                    index: index + "-" + i
                });
            }
            else {
                // map不会返回undefined和null
                console.error('Warning: SubMenu has a child which is not a MenuItem component');
            }
        });
        return (React.createElement(Transition, { in: menuOpen, timeout: 300, animation: 'zoom-in-left' },
            React.createElement("ul", { className: childrenClasses }, childrenComponent)));
        /* { <CSSTransition
           // in:TRUE入场 FALSE出场
           in={menuOpen}
           // timeout和css动画里面的时间的区别：
           // enter-active控制动画渐变的时间
           // timeout控制css中enter-done开始出现的时间(同时删除enter enter-active的样式)
           // 如果timeout太短，动画就来不及执行，
           // 一般二者保持相同即可（注意delay时间）
           timeout={300}
           classNames='zoom-in-top'
           // appear表示首次渲染必须动画（比如初始menuOpen为TRUE，仍然执行隐藏->显示动画）
           appear
           // timeout结束后卸载节点，避免opacity===0时dom仍然存在
           unmountOnExit
         >
           <ul className={childrenClasses}>
             {childrenComponent}
           </ul>
         </CSSTransition> }*/
    };
    return (React.createElement("li", __assign({ className: classes, key: index }, hoverEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents),
            title,
            React.createElement(Icon, { icon: 'angle-down', className: "arrow-icon" })),
        renderChildren()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
