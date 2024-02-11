import Card from "../Card/Card";
import classes from "../../sass/pages/diet-details.module.scss";
import useUserPrefs from "../../hooks/useUserPrefs";

interface CaloriesPriceTagsProps {
    prices: { kcal1500: number, kcal1800: number, kcal2000: number, kcal2200: number, kcal2500: number, kcal2800: number }
}

function CaloriesPriceTags({prices}: CaloriesPriceTagsProps) {
    const {assignHelperBadges} = useUserPrefs();
    const availableCalories = Object.keys(prices).map(cal => Number(cal.slice(4)));
    const helperBadges = assignHelperBadges(availableCalories)
    console.log(helperBadges)
    return (
        availableCalories.map((cal) => {
            const badge = helperBadges.find(badge => badge.value === cal)?.name;

            return (
            <Card key={cal}>
                <div className={classes.details__info__prices}>
                    <div>
                    {badge && <p className={classes.details__info__prices__badge}>{badge}</p>}
                    <p>{cal} kcal</p>
                    </div>
                    <p>{prices[`kcal${cal}`] as keyof { kcal1500: number; kcal1800: number; kcal2000: number; kcal2200: number; kcal2500: number; kcal2800: number; }} zł</p>
                </div>
            </Card>
                )
        }
        )
    )
}

export default CaloriesPriceTags