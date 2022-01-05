import React from "react";
import { ThemeProps } from '../Icon/icon'

interface ProgressProps {
  // 高度、主题、文本、百分比
  strokeHeight?: number,
  percent?: number,
  style?: React.CSSProperties,
  showText?: boolean,
  theme?: ThemeProps
}

export const Progress: React.FC<ProgressProps> = (props) => {
  const {
    strokeHeight,
    percent,
    style,
    showText,
    theme
  } = props

  return (
    <div className="wave-progress-bar" style={style}>
      <div className="wave-progress-bar-outer" style={{ height: `${strokeHeight}px`}}>
        <div
          className={`wave-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary'
}
Progress.displayName = 'Progress'