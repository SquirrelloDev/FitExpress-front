import BackButton from "../../../components/BackBtn/BackButton";
import {Tabs} from "@mantine/core";
import usePromosListQuery from "../../../queries/promocodes/listing";
import useAuthStore from "../../../stores/authStore";
import {useOneUserListQuery} from "../../../queries/user/listing";
import Card from "../../../components/Card/Card";
import classes from "../../../sass/pages/promocode-page.module.scss";
import {Grid} from "react-loader-spinner";
import {toast} from "react-hot-toast";
import {IconCopy} from "@tabler/icons-react";

export default function PromocodePage() {
    const userData = useAuthStore(state => state.userData)
    const {data, isLoading} = usePromosListQuery({token: userData.token, pageIndex: 0, pageSize: 0})
    const {data: userPromos, isLoading: userPromosLoading} = useOneUserListQuery({
        id: userData.id,
        token: userData.token
    })
    const copyCode = async (code: string) => {
        try{
            await navigator.clipboard.writeText(code)
            toast.success('Skopiowano kod do schowka!')
        }
        catch (e){
            console.error(e)
        }
    }
    return (
        <section className={classes.promos}>
            <BackButton/>
            <h1>Vouchery</h1>
            <div>
                <Tabs defaultValue={'available'}
                      classNames={{list: classes.promos__tabs__list, tab: classes.promos__tabs__tab}}>
                    <Tabs.List grow>
                        <Tabs.Tab value={'available'}>Dostępne</Tabs.Tab>
                        <Tabs.Tab value={'expired'}>Wykorzystane</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value={'available'}>
                        <div className={classes.promos__panel}>
                            {isLoading && <Grid/>}
                            {(!isLoading && !userPromosLoading) && data!.promocodes.filter(promo => (new Date(promo.exp_date) > new Date()) && !userPromos!.user.redeemed_codes.some(code => code._id === promo._id)).map(promo => (
                                <Card key={promo._id}>
                                    <div className={classes.promos__promo}>
                                        <p>Kod: {promo.name}</p>
                                        <p>Kod ważny do: {new Date(promo.exp_date).toLocaleDateString()}</p>
                                        {('clipboard' in navigator) && <button className={classes.promos__promo__copy} onClick={() => {copyCode(promo.name)}}><IconCopy /></button>}
                                    </div>
                                </Card>
                            ))}
                            {!isLoading && data!.promocodes.length === 0 && (
                                <div className={classes.promos__panel__empty}>
                                    <p>Aktualnie nie ma dostępnych kodów 😥</p>
                                </div>
                            )}
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value={'expired'}>
                        <div className={classes.promos__panel}>
							{userPromosLoading && <Grid/>}
                            {!userPromosLoading && userPromos!.user.redeemed_codes.map(code => (
                                <Card key={code._id}>
                                    <div>
                                        <p>{code.name}</p>
                                    </div>
                                </Card>
                            ))}
                            {!userPromosLoading && userPromos!.user.redeemed_codes.length === 0 && (
                                <div className={classes.promos__panel__empty}>
                                    <p>Brak wykorzystanych kodów 😊</p>
                                </div>
                            )}
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </div>
        </section>
    )
}