import classes from "../../sass/pages/diet-select.module.scss";
import {IconChevronLeft, IconPhotoOff} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import useDietsListQuery from "../../queries/diets/listing";
import {Skeleton} from "@mantine/core";
import Card from "../../components/Card/Card";
import {appRoutes} from "../../utils/routes";
import clsx from "clsx";

function FixedSelect() {
    const navigate = useNavigate()
    const userData = useAuthStore((state) => state.userData)
    const {data, isLoading} = useDietsListQuery({token: userData.token, pageIndex: 0, pageSize: 0})
    return (
        <div className={classes['page-wrapper']}>
            <button onClick={() => navigate(-1)} className={classes['page-wrapper__back']}><IconChevronLeft
                color={'#fff'} size={30}/></button>
            <h1 className={classes['page-wrapper__header']}>Diety Fixed</h1>
            <p className={classes['page-wrapper__sub-header']}>Która dieta jest dla Ciebie?</p>
            {isLoading && <Skeleton/>}
            {!isLoading && data?.diets.map(diet => (
                <Card key={diet._id} clearPadding>
                    <div onClick={() => navigate(appRoutes.diets + `/${diet._id}`)}
                         className={classes['page-wrapper__diet']}>
                        <h2 className={classes['page-wrapper__diet__header']}>{diet.name}</h2>
                        <p className={classes['page-wrapper__diet__desc']}>{diet.short_desc}</p>
                        {diet.imageBuffer ? <img className={classes['page-wrapper__diet__image']}
                                                 src={'data:;base64,' + `${diet.imageBuffer}`}
                                                 alt={`Obrazek diety: ${diet.name}`}/> : <div className={clsx(classes['page-wrapper__diet__image'],classes['page-wrapper__diet__image--blank'])}><IconPhotoOff size={30}/></div>}
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default FixedSelect