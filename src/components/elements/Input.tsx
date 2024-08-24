'use client'

import React, { memo, RefObject, useRef } from 'react'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any,
  value: any,
  type?: string,
  icon?: any
  placeholder?: string
  className?: string
}

function Input(props: Props) {

  const { onChange, value, type, icon, placeholder, ...rest } = props

  const initialValue = useRef<any>(value)

  function change(e: React.ChangeEvent<HTMLInputElement>) {


    console.log('hehe')


  }

  return (

    // <button className={`w-fit description border bg-background-2 text-color-1 font-semibold py-1.5 px-4 rounded-lg hover:scale-[1.01] duration-150 ${className}`} {...rest}>
    //   {children}
    // </button>

    <label className={`flex gap-2 w-fit description border bg-background-2 text-color-1 font-semibold py-2.5 px-4 rounded-lg hover:scale-[1.01] duration-150 ${rest.className}`}>
      {icon}
      <input placeholder={placeholder} type={type || 'text'} onChange={onChange} value={value as any} className='description text-color-1 bg-transparent outline-0'/>
    </label>

  )
}

export default memo(Input)

