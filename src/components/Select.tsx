import React, { ChangeEventHandler } from 'react'
import styles from "./Select.module.scss"

interface Prop {
    className?: string,
    children?:React.ReactNode,
    value?:string,
    onChange?:ChangeEventHandler<HTMLInputElement>,
    required?:boolean,
    placeholder?:string,
    defaultValue?:string,
    type?:React.HTMLInputTypeAttribute,
    pattern?:string,
    title?:string,
    style?: React.CSSProperties
}

function Select({ className,children,value,onChange,title,required,placeholder,defaultValue,type,pattern,style }: Prop) {
    return (
        <label style={style} className={'relative  z-0 shadow-[0px_0px_4px_rgba(0,0,0,0.385)] flex items-center justify-between px-2 py-1 rounded-md' + " " + className}>
            <input pattern={pattern} title={title}  defaultValue={defaultValue} placeholder={placeholder} required={required} onChange={onChange} value={value}  type={type} className={'w-full  remove-spin-wheel bg-transparent outline-none border-none '+styles.inputBox} />
            <ul  className={'absolute z-20 max-h-[150px] overflow-auto hidden left-0 bg-white shadow-[0px_0px_4px_rgba(0,0,0,0.385)]  w-full bottom-0 translate-y-[100%]  '+styles.dropDown}>
                {children}
            </ul>
            <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.94942 6.67905C3.00451 6.77647 3.08448 6.85751 3.18115 6.9139C3.27783 6.97029 3.38774 7 3.49965 7C3.61157 7 3.72148 6.97029 3.81816 6.9139C3.91483 6.85751 3.9948 6.77647 4.04989 6.67905L6.91449 1.6604C7.15811 1.23337 6.85219 0.699936 6.36285 0.699936L0.636455 0.699936C0.147821 0.699936 -0.158101 1.23337 0.0855165 1.6604L2.94942 6.67905Z" fill="#5970F5" />
            </svg>
        </label>
    )
}

export default Select