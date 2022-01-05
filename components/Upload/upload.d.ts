import React from "react";
interface UploadProps {
    action: string;
    onBeforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (progress: number, file: File) => void;
    onChange?: (file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (error: any, file: File) => void;
    withCredentials?: boolean;
    name?: string;
    headers?: {
        [key: string]: any;
    };
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
}
declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    name?: string;
    size?: number;
    percentage?: number;
    status?: UploadFileStatus;
    raw?: File;
    response?: any;
    error?: any;
}
export declare const Upload: React.FC<UploadProps>;
export {};
