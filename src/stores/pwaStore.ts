import {create} from "zustand";
import {persist} from "zustand/middleware";
interface PWAStore {
    notificationAllowed: boolean
    setNotification: (val: boolean) => void
}
const usePwaStore = create(persist<PWAStore>(
    (set,get) => ({
        notificationAllowed: false,
        setNotification: ((val) => {
            set(() => {
                return {notificationAllowed: val}
            })
        })
    }), {name: 'fit:pwa'}
))
export default usePwaStore