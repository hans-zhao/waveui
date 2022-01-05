import React from "react";
import { UploadFile } from "./upload";
import Icon from '../../components/Icon/icon';
import { Progress } from "../Progress/progress";

interface UploadListProps {
  fileList: UploadFile[],
  onRemove: (_file: UploadFile) => void
}

export const UploadList:React.FC<UploadListProps> = (props) => {
  const {
    fileList,
    onRemove
  } = props
  return (
    <ul className="wave-upload-list">
      {
        fileList.map((item) => {
          return <li className="wave-upload-list-item" key={item.uid}>
            {/* 图标 文件名 状态图标或点击图标（hover） 进度条*/}
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon='file-alt' theme="secondary"></Icon>
              {item.name}
            </span>
            <span className="file-status">
              {(item.status === 'uploading' || item.status === 'ready') && <Icon icon="spinner" spin theme="primary" />}
              {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
              {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
            </span>
            <span className="file-actions">
              <Icon icon="times" onClick={() => { onRemove(item)}}/>
            </span>
            {item.status === 'uploading' && 
              <Progress 
                percent={item.percentage || 0}
              />
            }
          </li>
        })
      }
    </ul>
  )
}

UploadList.displayName = 'UploadList'