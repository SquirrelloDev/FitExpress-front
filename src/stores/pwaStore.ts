import {create} from "zustand";
import {persist} from "zustand/middleware";
interface PWAStore {
    notificationAllowed: boolean
    appInstalled: boolean
    setNotification: (val: boolean) => void
    setAppInstalled: (val: boolean) => void
}
const usePwaStore = create(persist<PWAStore>(
    (set) => ({
        notificationAllowed: false,
        appInstalled: false,
        setNotification: ((val) => {
            set(() => {
                return {notificationAllowed: val}
            })
        }),
        setAppInstalled: ((val) => {
            set(() => {
                return {appInstalled: val}
            })
        })
    }), {name: 'fit:pwa'}
))
export default usePwaStore