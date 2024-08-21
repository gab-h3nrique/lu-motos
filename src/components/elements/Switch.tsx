'use client'

import React, { RefObject, useRef } from 'react'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any,
  value: boolean,
  className?: string
}

function Switch(props: Props) {

  const { onChange, value, ...rest } = props

  const initialValue = useRef<any>(value)

  function change(e: React.ChangeEvent<HTMLInputElement>) {





  }

  return (

    <label className={`relative p-[2px] w-11 h-fit rounded-full select-none cursor-pointer bg-color-3 has-[:checked]:bg-color-1 ${rest.className}`}>
      <input checked={value ? true : false} type="checkbox" onChange={onChange} className='hidden peer'/>
      <article className={`bg-background-1 w-5 h-5 rounded-full peer-checked:translate-x-[100%] duration-300 ease-in-out`}></article>
    </label>

  )
}

export default Switch