import Card from "../../Card/Card";
import React, {useCallback, useEffect} from "react";
import usePwaStore from "../../../stores/pwaStore";
import btnStyles from "../../../sass/components/button.module.scss";
import {IconCurrentLocation, IconMeat, IconScaleOutline} from "@tabler/icons-react";
import classes from "../../../sass/components/pwa-cta.module.scss";
import {BeforeInstallPromptEvent} from "../../../types/installprompt";

function PwaCta() {
    const setAppInstalled = usePwaStore(state => state.setAppInstalled)
    let installPrompt: BeforeInstallPromptEvent;
    const defferPrompt = useCallback((ev: Event) => {
        ev.preventDefault()
        installPrompt = ev as BeforeInstallPromptEvent
        return false
    }, [])
    const installApp = async () => {
        if (!installPrompt) {
            return;
        }
        const result = await installPrompt.prompt();
        if(result.outcome === 'accepted'){
            setAppInstalled(true)
        }
    }
    useEffect(() => {
        window.addEventListener('beforeinstallprompt', defferPrompt)
        return () => {
            window.removeEventListener('beforeinstallprompt', defferPrompt)
        }
    }, [defferPrompt])
    return (
        <Card>
            <div className={classes.pwa}>
                <h4>Czy wiesz, że...</h4>
                <p>Możesz dodać aplikację FitExpress do ekranu głównego?</p>
                <p>Co zyskujesz?</p>
                <div className={classes.pwa__perks}>
                <Card>
                    <div className={classes.pwa__perks__perk}>
                    <IconMeat size={30}/>
                    <p>Powiadomienia o zjedzieniu posiłku</p>
                    </div>
                </Card>
                <Card>
                    <div className={classes.pwa__perks__perk}>
                    <IconScaleOutline size={30} />
                    <p>Powiadomienia o uzupełnieniu wagi i wody</p>
                    </div>
                </Card>
                <Card>
                    <div className={classes.pwa__perks__perk}>
                    <IconCurrentLocation  size={30}/>
                    <p>Szybsze wypełnianie adresów</p>
                    </div>
                </Card>
                </div>
                <button className={btnStyles.btn} onClick={installApp}>Zainstaluj</button>
            </div>
        </Card>
    )
}

export default React.memo(PwaCta)