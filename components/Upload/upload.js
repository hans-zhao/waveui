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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useRef } from "react";
import axios from "axios";
import { UploadList } from "./uploadList";
import { Dragger } from "./dragger";
export var Upload = function (props) {
    var _a = useState([]), fileList = _a[0], setFileList = _a[1];
    var fileInput = useRef(null);
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var action = props.action, onBeforeUpload = props.onBeforeUpload, onProgress = props.onProgress, onChange = props.onChange, onSuccess = props.onSuccess, onError = props.onError, withCredentials = props.withCredentials, name = props.name, headers = props.headers, accept = props.accept, multiple = props.multiple, drag = props.drag, children = props.children;
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!onBeforeUpload) {
                post(file);
            }
            else {
                var result = onBeforeUpload(file);
                if (result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    // 更新列表中的文件状态
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (preFileList) {
            // 注意要返回新的fileList
            var result = preFileList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
            // console.log(result)
            return result;
        });
    };
    var post = function (file) {
        // 只要点选了文件 就增加
        var _file = {
            uid: Date.now() + 'upload_file',
            name: file.name,
            size: file.size,
            status: 'ready',
            percentage: 0,
            raw: file
        };
        // 注意异步问题：multiple时，直接setFileList()，会导致覆盖
        setFileList(function (preList) {
            return __spreadArray([_file], preList, true);
        });
        var formData = new FormData();
        formData.append(name || 'fileName', file);
        axios.post(action, formData, {
            withCredentials: withCredentials,
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            onUploadProgress: function (e) {
                var percentage = Math.round(e.loaded * 100 / e.total) || 0;
                if (percentage < 100) {
                    // console.log(fileList) // setFileList是异步，无法获取到正确的fileList
                    // 再次使用setFileList，并使用函数参数
                    updateFileList(_file, {
                        status: 'uploading',
                        percentage: percentage
                    });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(function (resp) {
            if (onSuccess) {
                onSuccess(resp.data, file);
            }
            updateFileList(_file, {
                status: 'success',
                percentage: 100,
                response: resp.data
            });
        }).catch(function (error) {
            if (onError) {
                onError(error, file);
            }
            updateFileList(_file, {
                status: 'error',
                error: error
            });
        }).finally(function () {
            if (onChange) {
                onChange(file);
            }
        });
    };
    var handleChange = function (e) {
        var _a;
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if ((_a = fileInput.current) === null || _a === void 0 ? void 0 : _a.value) {
            fileInput.current.value = '';
        }
    };
    var handleRemove = function (item) {
        setFileList(function (preFileList) {
            // 注意要返回新的fileList
            var result = preFileList.filter(function (file) {
                return file.uid !== item.uid;
            });
            // console.log(result)
            return result;
        });
    };
    return (React.createElement("div", { className: "wave-upload-component" },
        React.createElement("div", { className: "wave-upload-input", style: { display: 'inline-block' }, onClick: handleClick },
            drag ? React.createElement(Dragger, { onFile: function (files) { uploadFiles(files); } }, children) : children,
            React.createElement("input", { className: "wave-file-input", style: { display: 'none' }, ref: fileInput, type: "file", accept: accept, multiple: multiple, onChange: handleChange })),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.displayName = 'Upload';
Upload.defaultProps = {
    name: 'fileName',
    drag: false
};
