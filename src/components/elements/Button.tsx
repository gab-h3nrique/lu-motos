'use client'

import React from 'react'

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

  const { className, children, ...rest} = props

  return (

    <button className={`w-fit border description bg-background-1 text-color-1 font-semibold py-1.5 px-4 rounded-lg ${className}`} {...rest}>
      {children}
    </button>

  )
}

export default Button