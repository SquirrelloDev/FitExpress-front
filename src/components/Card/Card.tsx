import {ReactNode} from "react";
import classes from "../../sass/components/card.module.scss";

interface CardProps {
	children?: ReactNode
}
function Card({children}:CardProps) {
	return (
		<div className={classes.card}>
			{children}
		</div>
	)
}
export default Card