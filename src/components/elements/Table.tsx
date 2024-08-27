
import React, { memo } from 'react'

export const Table = memo((props: React.TableHTMLAttributes<HTMLTableElement>) => {

  const { className, children, ...rest} = props

  return (

    <table className={`gap-[1px] w-fit h-fit flex flex-col border bg-border rounded-lg overflow-hidden ${className}`} {...rest}>
      {children}
    </table>

  )
})
export const Tr = memo((props: React.HTMLAttributes<HTMLTableRowElement>) => {

  const { className, children, ...rest} = props

  return (

    <tr className={`gap-[1px] flex ${className}`} {...rest}>
      {children}
    </tr>

  )
})
export const Td = memo((props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => {

  const { className, children, ...rest} = props

  return (

    <td className={`p-2 bg-background-1 text-color-2 ${className}`} {...rest}>
      {children}
    </td>

  )
})

export const Th = memo((props: React.TdHTMLAttributes<HTMLTableDataCellElement>) => {

  const { className, children, ...rest} = props

  return (

    <th className={`p-2 bg-background-1 text-color-2 ${className}`} {...rest}>
      {children}
    </th>

  )
})
