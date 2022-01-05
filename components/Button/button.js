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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
// classnames用于编写class
import classnames from 'classnames';
/**
 * Primary UI component for user interaction
 */
export var Button = function (props) {
    var _a;
    var className = props.className, btnType = props.btnType, size = props.size, disabled = props.disabled, children = props.children, href = props.href, 
    // 所有自带的原生属性
    restProps = __rest(props
    // 生成class: btn  btn-primary btn-small
    , ["className", "btnType", "size", "disabled", "children", "href"]);
    // 生成class: btn  btn-primary btn-small
    var classes = classnames('btn', className, (_a = {},
        _a["btn-" + btnType] = btnType,
        _a["btn-" + size] = size,
        // 注意disabled是button的默认属性，因此
        // 这里只给a添加
        _a.disabled = (btnType === 'link') && disabled,
        _a));
    // 判断button还是a
    if (btnType === 'link' && href) {
        return (React.createElement("a", __assign({ className: classes, href: href, target: '_blank', rel: "noreferrer" }, restProps), children));
    }
    else {
        return (React.createElement("button", __assign({ className: classes, disabled: disabled }, restProps), children));
    }
};
// props默认值
Button.defaultProps = {
    btnType: 'default',
    size: 'md',
    disabled: false
};
