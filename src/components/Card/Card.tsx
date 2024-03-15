import {ReactNode} from "react";
import classes from "../../sass/components/card.module.scss";
import clsx from "clsx";

interface CardProps {
	children?: ReactNode
	clearPadding?: boolean
	hover?:boolean
}
function Card({children, clearPadding, hover}:CardProps) {
	return (
		<div className={clsx(classes.card, clearPadding && classes['card--clear-padding'], hover && classes['card--hover'])}>
			{children}
		</div>
	)
}
export default Card