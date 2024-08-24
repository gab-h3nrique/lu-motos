'use client'

import React, { RefObject, useRef, useState } from 'react'
import Svg from '../icons/Svg'

interface Props {

  data: any[],
  value?: any,
  renderItem: (e: any, index?: number) => any,

  className?: string,
  style?: string

}

export default function Select(props: Props) {

  const { data, value, renderItem, ...rest } = props

  const [ isOpen, setIsOpen] = useState(false)

  const list: any[] = [];

  data.forEach((e, i) => {

    list.push(renderItem(e, i))

  })

  function close() {

    setIsOpen(false)

  }

  function open() {

    setIsOpen(true)

  }

  return (

    <>

      <div onClick={close} className={`fixed top-0 left-0 backdrop-blur-[3px] w-full h-full ${!isOpen ? "opacity-0 pointer-events-none hidden" : "opacity-1 pointer-events-auto z-[30]"}`}></div>

      <div className='relative flex'>
        <button onClick={open} className={`relative flex gap-3 w-fit border description bg-background-2 text-color-1 font-semibold py-1.5 px-4 rounded-lg hover:scale-[1.01] duration-150 ${props.className}`} {...rest as any}>
          <span>{value}</span>
          <Svg.Angle className='w-4 h-4 fill-color-1 rotate-180 mt-[.25rem]'/>


        </button>
        
        <section className={`${!isOpen ? "opacity-0 pointer-events-none" : "opacity-1 pointer-events-auto z-[99]"} flex w-fit h-fit absolute m-auto top-0 bottom-0 left-0 right-0 origin-center overflow-auto overflow-x-hidden`} >
          <div className="flex flex-col gap-2 py-4 px-10 w-fit h-fit bg-background-2 border rounded-2xl text-color-1 description" >

            { list.map((item, i) => <div className='cursor-pointer hover:scale-[1.01] duration-150' onClick={close} key={i}>{item}</div>) }

          </div>
        </section>

      </div>


    </>


  )
}