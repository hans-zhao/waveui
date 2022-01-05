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
import React, { useState, useEffect, useRef } from "react";
import Icon from "../Icon/icon";
import { Input } from "../Input/input";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition/transition";
import useDebounce from '../../hooks/useDebounce';
/**
 * AutoComplete 组件
 */
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props
    // 受控组件
    // 输入值 【 注意value -> inputValue -> <Input value={inputValue} /> 】
    , ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    // 受控组件
    // 输入值 【 注意value -> inputValue -> <Input value={inputValue} /> 】
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    // 下拉数据
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    // 高亮键盘选中行
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    // flag：用于判断inputValue变化是在handleSelect还是handleChange
    var triggerSearch = useRef(false);
    // 用于clickOutside
    var componentRef = useRef(null);
    var debounceValue = useDebounce(inputValue, 500);
    var _e = useState(false), showDropdown = _e[0], setShowDropdown = _e[1];
    useClickOutside(componentRef, function () { return setShowDropdown(false); });
    useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            setSuggestions([]);
            var result = fetchSuggestions(debounceValue);
            if (result instanceof Promise) {
                setLoading(true);
                result.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                    if (data.length) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setSuggestions(result);
                if (result.length) {
                    setShowDropdown(true);
                }
            }
        }
        else {
            setShowDropdown(false);
        }
        setHighlightIndex(-1);
    }, [debounceValue, fetchSuggestions]);
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        if (onSelect) {
            onSelect(item);
        }
        setShowDropdown(false);
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement(Transition, { in: showDropdown || loading, timeout: 500, animation: 'zoom-in-top', onExited: function () { return setSuggestions([]); } },
            React.createElement("ul", { className: "wave-suggestion-list" },
                loading && React.createElement("div", { className: "suggstions-loading-icon" },
                    React.createElement(Icon, { icon: 'spinner', spin: true })),
                suggestions.map(function (item, index) {
                    var classes = classNames('suggestion-item', {
                        'is-active': index === highlightIndex
                    });
                    return (React.createElement("li", { className: classes, key: index, onClick: function () { handleSelect(item); } }, renderTemplate(item)));
                }))));
    };
    // 下拉列表键盘选择处理
    var highlight = function (index) {
        if (index < 0) {
            index = 0;
        }
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        // Escape  Enter
        // ArrowUp  ArrowDown 修改样式
        // console.log(e.key)
        switch (e.key) {
            case 'Escape':
                setShowDropdown(false);
                break;
            case 'Enter':
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 'ArrowUp':
                highlight(highlightIndex - 1);
                break;
            case 'ArrowDown':
                highlight(highlightIndex + 1);
                break;
            default:
                break;
        }
    };
    return (React.createElement("div", { className: "wave-auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue }, restProps, { onChange: handleChange, onKeyDown: handleKeyDown })),
        suggestions.length > 0 && generateDropdown()));
};
