import { useState, useEffect } from "react";
// 取debounce后的输入值
function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debounceValue = _a[0], setDebounceValue = _a[1];
    useEffect(function () {
        var timer = setTimeout(function () {
            setDebounceValue(value);
        }, delay);
        return function () {
            clearTimeout(timer);
        };
    }, [value, delay]);
    return debounceValue;
}
export default useDebounce;
