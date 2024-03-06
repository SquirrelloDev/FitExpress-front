import usePwaStore from "../../../stores/pwaStore";
import {toast} from "react-hot-toast";
import usePushCreate, {usePushRemove, WebPushCreateData, WebPushRemoveData} from "../../../queries/PWA/webpush";
import useAuthStore from "../../../stores/authStore";
import {transformKey} from "../../../utils/webpush";
import {IconBell} from "@tabler/icons-react";
import {Switch} from "@mantine/core";
import classes from "../../../sass/pages/profile.module.scss";
import clsx from "clsx";
import btnStyles from "../../../sass/components/button.module.scss";

function PushCta() {
    const userData = useAuthStore(state => state.userData)
    const setNotification = usePwaStore(state => state.setNotification)
    const notificationAllowed = usePwaStore(state => state.notificationAllowed)
    const {mutate, isLoading: isCreating} = usePushCreate()
    const {mutate: deleteSub, isLoading: isRemoving} = usePushRemove()
    const allowPushNotifs = async () => {
        const result = await Notification.requestPermission()
        if (result === 'denied') {
            toast('Nie zezwolono na powiadomienia')
            return
        }
        if (result === 'granted') {
            console.info('Zaakceptowane')
        }
        const registration = await navigator.serviceWorker.getRegistration()
        if (registration) {
            const subscribed = await registration.pushManager.getSubscription()
            if (subscribed) {
                toast('Już wcześniej zezwolono na powiadomienia')
                setNotification(true)
                return
            }
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: transformKey('BNhQhX4vzbpvl5nT9_qv67RpMD41ueZTsK3qDgRcbuYMU37vBYUyScYh_NBkaaSTdfapKuXlHv_Sdrkv1OF5vTw')
            })
            const obj: WebPushCreateData = {
                token: userData.token,
                subscription
            }
            mutate(obj)

        }
    }
    const removePush = async () => {
        const registration = await navigator.serviceWorker.getRegistration()
        if (registration) {
            const subscription = await registration.pushManager.getSubscription()
            const obj: WebPushRemoveData = {
                token: userData.token,
                endpoint: subscription ? subscription.endpoint : ''
            }
            deleteSub(obj)
        }
    }

    return (
        <button disabled={(isCreating || isRemoving)}
                className={clsx(btnStyles.btn, btnStyles['btn--dark'], classes.profile__nav__item, classes['profile__nav__item--notification'])}
                onClick={() => notificationAllowed ? removePush() : allowPushNotifs()}>
            <div className={classes.profile__nav__item__block}>
                <IconBell/>
                <p>Powiadomienia</p>
            </div>
            <Switch size={'lg'} checked={notificationAllowed} color={'green'}/>
        </button>
    )
}

export default PushCta