import React, { ChangeEvent, useState, useRef } from "react";
import axios from "axios";
import { UploadList } from "./uploadList";
import { Dragger } from "./dragger";

interface UploadProps {
    action: string,
    // 生命周期
    onBeforeUpload?: (file: File) => boolean | Promise<File>,
    onProgress?: (progress: number, file: File) => void,
    onChange?: (file: File) => void,
    onSuccess?: (data: any, file: File) => void,
    onError?: (error: any, file: File) => void,
    withCredentials?: boolean,
    name?: string,
    headers?: { [key: string]: any },
    accept?: string,
    multiple?: boolean,
    drag?: boolean
}

type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
    uid: string,
    name?: string,
    size?: number,
    percentage?: number,
    status?: UploadFileStatus,
    raw?: File,
    response?: any,
    error?: any
}

export const Upload: React.FC<UploadProps> = (props) => {
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const fileInput = useRef<HTMLInputElement>(null)
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }

    const {
        action,
        onBeforeUpload,
        onProgress,
        onChange,
        onSuccess,
        onError,
        withCredentials,
        name,
        headers,
        accept,
        multiple,
        drag,
        children
    } = props

    const uploadFiles = (files: FileList) => {
        const postFiles = Array.from(files)
        postFiles.forEach(file => {
            if (!onBeforeUpload) {
                post(file)
            }
            else {
                const result = onBeforeUpload(file)
                if (result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            }

        })
    }

    // 更新列表中的文件状态
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList((preFileList) => {
            // 注意要返回新的fileList
            const result = preFileList.map((file) => {
                if (file.uid === updateFile.uid) {
                    return { ...file, ...updateObj }
                }
                else { return file }
            })
            // console.log(result)
            return result
        })
    }

    const post = (file: File) => {
        // 只要点选了文件 就增加
        let _file: UploadFile = {
            uid: Date.now() + 'upload_file',
            name: file.name,
            size: file.size,
            status: 'ready',
            percentage: 0,
            raw: file
        }
        // 注意异步问题：multiple时，直接setFileList()，会导致覆盖
        setFileList((preList) => {
            return [_file, ...preList]
        })
        let formData = new FormData()
        formData.append(name || 'fileName', file)
        axios.post(action, formData, {
            withCredentials,
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (e) => {
                const percentage = Math.round(e.loaded * 100 / e.total) || 0;
                if (percentage < 100) {
                    // console.log(fileList) // setFileList是异步，无法获取到正确的fileList
                    // 再次使用setFileList，并使用函数参数
                    updateFileList(_file, {
                        status: 'uploading',
                        percentage
                    })
                    if (onProgress) {
                        onProgress(percentage, file)
                    }
                }
            }
        }).then(resp => {
            if (onSuccess) {
                onSuccess(resp.data, file)
            }
            updateFileList(_file, {
                status: 'success',
                percentage: 100,
                response: resp.data
            })
        }).catch(error => {
            if (onError) {
                onError(error, file)
            }
            updateFileList(_file, {
                status: 'error',
                error
            })
        }).finally(() => {
            if (onChange) {
                onChange(file)
            }
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) {
            return
        }
        uploadFiles(files)
        if (fileInput.current?.value) {
            fileInput.current.value = ''
        }
    }

    const handleRemove = (item: UploadFile) => {
        setFileList((preFileList) => {
            // 注意要返回新的fileList
            const result = preFileList.filter((file) => {
                return file.uid !== item.uid
            })
            // console.log(result)
            return result
        })
    }

    return (
        <div className="wave-upload-component">
            <div
                className="wave-upload-input"
                style={{display: 'inline-block'}}
                onClick={handleClick}
            >
                { drag ? <Dragger onFile={(files) => {uploadFiles(files)}}>{children}</Dragger> : children }
                <input
                    className="wave-file-input"
                    style={{ display: 'none' }}
                    ref={fileInput}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleChange}
                />
            </div>
            <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
        </div>
    )
}

Upload.displayName = 'Upload'
Upload.defaultProps = {
    name: 'fileName',
    drag: false
}