import Card from "../Card/Card";
import {IconBolt, IconDroplet, IconEggs} from "@tabler/icons-react";
import classes from "../../sass/pages/diet-details.module.scss";
interface MacroItemsProps {
    carbs: number,
    fats: number,
    proteins: number
}

function MacroItems({carbs, fats, proteins}: MacroItemsProps) {
    return (
        <div className={classes.details__info__macros__items}>
            <Card>
                <div className={classes.details__info__macros__items__item}>
                    <IconDroplet size={35}/>
                    <p>Tłuszcze</p>
                    <p>{fats}%</p>
                </div>
            </Card>
            <Card>
                <div className={classes.details__info__macros__items__item}>
                    <IconEggs size={35}/>
                    <p>Białka</p>
                    <p>{proteins}%</p>
                </div>
            </Card>
            <Card>
                <div className={classes.details__info__macros__items__item}>
                    <IconBolt size={35}/>
                    <p>Węglow.</p>
                    <p>{carbs}%</p>
                </div>
            </Card>
        </div>
    )
}

export default MacroItems