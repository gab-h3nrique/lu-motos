import { memo, useEffect, useRef, useState } from "react";
import Svg from "../icons/Svg";
import { NotificationItemType } from "@/contexts/NotificationContext";

interface Props {
    notification: NotificationItemType;
    onClose?: () => void
}

function NotificationItem({ notification, onClose }: Props) {

    const [startTransition, setStartTransition] = useState(false)
    const [closeTransition, setCloseTransition] = useState(false)

    function start() {

        if(!notification.time) return

        setStartTransition(true)
        setTimeout(()=> setCloseTransition(true), (notification.time - 300))

    }

    useEffect(()=> {

        start()

    }, [])


    return (

        <article className={`flex w-80 h-24 relative duration-300 ${closeTransition ? 'overflow-hidden h-0 opacity-0' : ''}`}>
            <div className={`${ startTransition ? '-translate-x-96' : ''} absolute left-96 ease-in-out duration-700 bg-backgorund-2 border rounded-lg w-full h-full p-3 gap-3 flex shadow-sm pointer-events-auto`}>
    
                <section className="pt-1">
                    {
                        notification.type == 'success' ?  <Svg.Check className="h-5 w-5 fill-green-600"/> 
                        : notification.type == 'warning' ? <Svg.TriangleExclamation className="h-5 w-5 fill-yellow-500" />
                        : notification.type == 'error' ? <Svg.Close className="h-5 w-5 fill-red-600" />
                        : null
                    }
                </section>
    
                
                <section className='flex flex-col gap-1 justify-around'>
                    <span className='font-semibold text-color-1 text-base'>{notification.title}</span>
                    <p className='font-medium text-color-1 opacity-90 text-sm'>{notification.description}</p>
                </section>
    
                <section onClick={onClose} className="ml-auto">
                    <Svg.Close className="fill-color-1 w-4 h-4 cursor-pointer"/>
                </section>
                
            </div>
        </article>

    )

}

export default  memo(NotificationItem)