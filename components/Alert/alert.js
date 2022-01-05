import React, { useState } from "react";
import classnames from 'classnames';
import Transition from '../Transition/transition';
import Icon from '../Icon/icon';
export var Alert = function (props) {
    var _a;
    var className = props.className, type = props.type, closeable = props.closeable, title = props.title, description = props.description, children = props.children, close = props.close;
    var _b = useState(true), alertShow = _b[0], setShow = _b[1];
    var handleClose = function () {
        if (close)
            close();
        setShow(false);
    };
    var classes = classnames('alert', className, (_a = {},
        _a["alert-" + type] = type,
        _a['alert-show'] = !alertShow,
        _a));
    // children覆盖description
    return (React.createElement(Transition, { in: alertShow, timeout: 500, animation: "zoom-in-left" },
        React.createElement("div", { className: classes },
            closeable &&
                React.createElement("span", { className: "alert-closebtn", onClick: function () { return handleClose(); } },
                    React.createElement(Icon, { icon: 'window-close', className: "window-close" })),
            title && React.createElement("div", { className: "alert-title" }, title),
            children ? React.createElement("div", null, children) : (description && React.createElement("div", null, description)))));
};
Alert.defaultProps = {
    type: 'default',
    closeable: true,
};
