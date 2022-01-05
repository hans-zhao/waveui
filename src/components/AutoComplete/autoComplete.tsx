import React, { ChangeEvent, useState, useEffect, useRef, KeyboardEvent } from "react";
import Icon from "../Icon/icon";
import { Input, InputProps } from "../Input/input";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition/transition";
import useDebounce from '../../hooks/useDebounce';

// 支持自定义模板（类似装饰器）,用于显示json数据（即下拉数据是对象而不是字符串）
interface DataSourceObject {
  value: string;
}
// 支持传入包含value的任意对象
export type DataSourceType<T = {}> = T & DataSourceObject
interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**
   * 抓取数据
   */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>,
  /**
   * 自定义模板
   */
  renderOption?: (item: DataSourceType) => React.ReactElement
  /**
   * select 事件
   */
  onSelect?: (item: DataSourceType) => void
}

/**
 * AutoComplete 组件
 */
export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props

  // 受控组件
  // 输入值 【 注意value -> inputValue -> <Input value={inputValue} /> 】
  const [inputValue, setInputValue] = useState(value as string)
  // 下拉数据
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  // 高亮键盘选中行
  const [highlightIndex, setHighlightIndex] = useState(-1)
  // flag：用于判断inputValue变化是在handleSelect还是handleChange
  const triggerSearch = useRef(false)
  // 用于clickOutside
  const componentRef = useRef<HTMLDivElement>(null)

  const debounceValue = useDebounce(inputValue, 500)

  const [ showDropdown, setShowDropdown ] = useState(false)

  useClickOutside(componentRef, () => setShowDropdown(false))
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      setSuggestions([])
      const result = fetchSuggestions(debounceValue)
      if (result instanceof Promise) {
        setLoading(true)
        result.then(data => {
          setLoading(false)
          setSuggestions(data)
          if(data.length) {
            setShowDropdown(true)
          }
        })
      } else {
        setSuggestions(result)
        if(result.length) {
          setShowDropdown(true)
        }
      }
    } else {
      setShowDropdown(false)
    }
    setHighlightIndex(-1)
  }, [debounceValue, fetchSuggestions])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    if (onSelect) {
      onSelect(item)
    }
    setShowDropdown(false)
    triggerSearch.current = false
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        timeout={500}
        animation='zoom-in-top'
        onExited={()=>setSuggestions([])}
      >
        <ul className="wave-suggestion-list">
          {loading && <div className="suggstions-loading-icon">
            <Icon icon='spinner' spin></Icon>
          </div>}
          {
            suggestions.map((item, index) => {
              const classes = classNames('suggestion-item', {
                'is-active': index === highlightIndex
              })
              return (
                <li className={classes} key={index} onClick={() => { handleSelect(item) }}>
                  {renderTemplate(item)}
                </li>
              )
            })
          }
        </ul>
      </Transition>
    )
  }

  // 下拉列表键盘选择处理
  const highlight = (index: number) => {
    if (index < 0) {
      index = 0
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Escape  Enter
    // ArrowUp  ArrowDown 修改样式
    // console.log(e.key)
    switch (e.key) {
      case 'Escape':
        setShowDropdown(false)
        break;
      case 'Enter':
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break;
      case 'ArrowUp':
        highlight(highlightIndex - 1)
        break;
      case 'ArrowDown':
        highlight(highlightIndex + 1)
        break;
      default:
        break;
    }
  }

  return (
    <div className="wave-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        {...restProps}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      ></Input>
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}