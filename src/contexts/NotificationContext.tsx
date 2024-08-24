'use client'

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import NotificationItem from "@/components/notifications/NotificationsItem";

interface ContextType {

    list: NotificationItemType[] | undefined,
    push: (object: NotificationItemType) => void

}

export interface NotificationItemType {
    type: 'alert' | 'success' | 'warning' | 'error',
    title: string,
    description: string,
    time?: number
}

export const NotificationContext = createContext<ContextType | undefined>(undefined);

export const NotificationProvider = ({ children }:any) => {

    const [ list, setList ] = useState<NotificationItemType[]>([])

    const removeItem = useCallback((index: number)=> {

        setList((prev) => (prev.filter((e, i)=> i !== index)))

    }, [])

    const push = useCallback((item: NotificationItemType)=> {

        const TIMER = item.time && item.time > 700 ? item.time : 700

        setList((prev) => {

            setTimeout(()=> removeItem(prev.length), TIMER + 700)

            return [...prev, item]

        })

    }, [])

    const contextValue = useMemo(()=> ({

        list,
        push

    }), [list])

    return (

        <NotificationContext.Provider value={contextValue}>

            <div className='w-full h-fit flex absolute z-50 pointer-events-none overflow-hidden'>

                <div className='relative flex flex-col ml-auto p-3 gap-3'>

                    { list?.map((item, i) =>  <NotificationItem key={i} notification={item} onClose={()=> removeItem(i)} />) }

                </div>

            </div>

            {children}

        </NotificationContext.Provider>
    )
}