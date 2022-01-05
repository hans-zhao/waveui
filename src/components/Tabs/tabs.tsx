import React, { useState, createContext } from "react";
import classNames from "classnames";
import { TabItemProps } from './tabItem'

type SelectCallback = (index: string) => void

type TabsMode = 'border' | 'card'

export interface TabsProps {
  className?: string,
  style?: React.CSSProperties,
  defaultIndex?: string,
  onSelect?: SelectCallback,
  mode?: TabsMode
}

interface ITabsContext {
  index: string,
  onSelect?: SelectCallback
}

export const TabsContext = createContext<ITabsContext>({
  index: '0'
})

export const Tabs: React.FC<TabsProps> = (props) => {
  const {
    className,
    style,
    defaultIndex,
    mode,
    onSelect,
    children
  } = props

  const [currentActive, setActive] = useState(defaultIndex)

  // 样式可以全部定义在外层
  const classes = classNames('wave-tabs', className, {
    'tabs-border': mode === 'border',
    'tabs-card': mode === 'card'
  })

  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: ITabsContext = {
    index: currentActive || '0',
    onSelect: handleClick
  }

  const generateChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childrenElement = child as React.FunctionComponentElement<TabItemProps>
      if (childrenElement.type === undefined) {
        console.error('Warning: Tabs has a child which is not a tabItem')
      }
      else {
        const { displayName } = childrenElement.type
        if (displayName === 'TabItem') {
          return React.cloneElement(childrenElement, {
            index: index.toString()
          })
        } else {
          console.error('Warning: Tabs has a child which is not a tabItem')
        }
      }
    })
  }

  const generateContent = () => {
    let content
    React.Children.forEach(children, (child, index) => {
      const childrenElement = child as React.FunctionComponentElement<TabItemProps>
      if (childrenElement.props === undefined) {
        console.error('Warning: Tabs has a child which is not a tabItem')
      }
      else {
        const { children } = childrenElement.props
        if (index.toString() === currentActive) {
          content = children
          return false
        }
      }
    })
    return content
  }

  return (
    <TabsContext.Provider value={passedContext}>
      <div className="wave-tabs-wrapper">
        <ul style={style} className={classes} data-testid='test-tabs'>
          {generateChildren()}
        </ul>
      </div>
      {/* content */}
      <div className="tabs-content">{generateContent()}</div>
    </TabsContext.Provider>
  )
}

Tabs.defaultProps = {
  defaultIndex: '0',
  mode: 'border'
}
