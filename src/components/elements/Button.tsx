'use client'

import React from 'react'

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

  const { className, children, ...rest} = props

  return (

    <button className={`w-fit description border bg-background-2 text-color-1 font-semibold py-1.5 px-4 rounded-lg hover:scale-[1.01] duration-150 ${className}`} {...rest}>
      {children}
    </button>

  )
}

export default Button