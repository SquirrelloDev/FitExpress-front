import {ReactNode} from "react";
import classes from "../../sass/components/card.module.scss";
import clsx from "clsx";

interface CardProps {
	children?: ReactNode
	clearPadding?: boolean
}
function Card({children, clearPadding}:CardProps) {
	return (
		<div className={clsx(classes.card, clearPadding && classes['card--clear-padding'])}>
			{children}
		</div>
	)
}
export default Card