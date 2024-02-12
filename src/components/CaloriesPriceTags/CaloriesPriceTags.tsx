import Card from "../Card/Card";
import classes from "../../sass/pages/diet-details.module.scss";
import useUserPrefs from "../../hooks/useUserPrefs";

interface CaloriesPriceTagsProps {
    prices: Record<string, number>
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
                    <p>{prices[`kcal${cal}`] as keyof Record<number, number>} zł</p>
                </div>
            </Card>
                )
        }
        )
    )
}

export default CaloriesPriceTags