import { NotificationContext } from "@/contexts/NotificationContext";
import { useContext } from "react";


export const useNotification = () => {

    const context = useContext(NotificationContext);

    if(!context) throw new Error('context should be used inside its provider');

    return context

};