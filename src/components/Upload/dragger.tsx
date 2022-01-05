import React, { useState, DragEvent } from "react";
import classNames from "classnames";

interface DraggerProps {
  onFile: (files: FileList) => void
}

export const Dragger:React.FC<DraggerProps> = (props) => {
  const {
    onFile,
    children
  }  = props

  // over时添加样式
  const [ dragover, setDragover ] = useState(false)

  const classes = classNames('wave-uploader-dragger', {
    'is-dragover': dragover
  })

  const handleDragOver = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.nativeEvent.stopImmediatePropagation()
    e.preventDefault()
    setDragover(over)
  }

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.nativeEvent.stopImmediatePropagation()
    e.preventDefault()
    setDragover(false)
    onFile(e.dataTransfer.files)
  }

  return (
    <div
      className={classes}
      onDragOver={e => handleDragOver(e, true)}
      onDragLeave={e => handleDragOver(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}