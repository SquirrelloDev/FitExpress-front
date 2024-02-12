import classes from "../../sass/components/nutrition.module.scss";

interface NutritionProps {
	value?: number,
	name: string,
	unit: string
}
function Nutrition({value, name, unit}:NutritionProps) {
	return (
		<div className={classes.nutrition}>
			<div className={classes.nutrition__value}><p>{value ? value : 'N/A'}</p></div>
			<div className={classes['nutrition__text-wrapper']}>
				<p>{name}</p>
				<p>{unit}</p>
			</div>
		</div>
	)
}
export default Nutrition