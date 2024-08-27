
import React, { memo } from 'react'

export const Table = memo((props: React.TableHTMLAttributes<HTMLTableElement>) => {

  const { className, children, ...rest} = props

  return (

    <table className={`rounded-lg ${className}`} {...rest}>
      {children}
    </table>

  )
})
export const Tbody = memo((props: React.HTMLAttributes<HTMLTableSectionElement>) => {

  const { className, children, ...rest} = props

  return (

    <tbody className={`flex items-center gap-2 button w-fit description border bg-background-2 text-color-1 font-semibold py-1.5 px-4 rounded-lg ${className}`} {...rest}>
      {children}
    </tbody>

  )
})
export const Thead = memo((props: React.HTMLAttributes<HTMLTableSectionElement>) => {

  const { className, children, ...rest} = props

  return (

    <thead className={`flex items-center gap-2 button w-fit description border bg-background-2 text-color-1 font-semibold py-1.5 px-4 rounded-lg ${className}`} {...rest}>
      {children}
    </thead>

  )
})
export const Tr = memo((props: React.HTMLAttributes<HTMLTableRowElement>) => {

  const { className, children, ...rest} = props

  return (

    <tr className={`flex items-center gap-2 button w-fit description border bg-background-2 text-color-1 font-semibold py-1.5 px-4 rounded-lg ${className}`} {...rest}>
      {children}
    </tr>

  )
})
export const Td = memo((props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => {

  const { className, children, ...rest} = props

  return (

    <td className={`flex items-center gap-2 button w-fit description border bg-background-2 text-color-1 font-semibold py-1.5 px-4 rounded-lg ${className}`} {...rest}>
      {children}
    </td>

  )
})
