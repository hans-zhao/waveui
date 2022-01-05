import { useEffect, RefObject } from "react";

// 点击到指定容器外部（outside）触发事件
function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
    useEffect(() => {
        const listener = (e: MouseEvent) => {
            // 点击了容器内部或者null：不触发
            // contains ：判断节点包含关系
            if(!ref.current || ref.current.contains(e.target as HTMLElement)) {
                return
            }
            handler()
        }
        document.addEventListener('click', listener)
        return () => {
            document.removeEventListener('click', listener)
        }
    }, [ref, handler])
}

export default useClickOutside