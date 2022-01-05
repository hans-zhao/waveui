import React from "react";
export var Progress = function (props) {
    var strokeHeight = props.strokeHeight, percent = props.percent, style = props.style, showText = props.showText, theme = props.theme;
    return (React.createElement("div", { className: "wave-progress-bar", style: style },
        React.createElement("div", { className: "wave-progress-bar-outer", style: { height: strokeHeight + "px" } },
            React.createElement("div", { className: "wave-progress-bar-inner color-" + theme, style: { width: percent + "%" } }, showText && React.createElement("span", { className: "inner-text" }, percent + "%")))));
};
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: 'primary'
};
Progress.displayName = 'Progress';
