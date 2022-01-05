import React, { useState } from "react";
import classNames from "classnames";
export var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    // over时添加样式
    var _a = useState(false), dragover = _a[0], setDragover = _a[1];
    var classes = classNames('wave-uploader-dragger', {
        'is-dragover': dragover
    });
    var handleDragOver = function (e, over) {
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
        setDragover(over);
    };
    var handleDrop = function (e) {
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
        setDragover(false);
        onFile(e.dataTransfer.files);
    };
    return (React.createElement("div", { className: classes, onDragOver: function (e) { return handleDragOver(e, true); }, onDragLeave: function (e) { return handleDragOver(e, false); }, onDrop: handleDrop }, children));
};
