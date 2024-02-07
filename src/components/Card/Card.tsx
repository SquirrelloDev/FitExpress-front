import {ReactNode} from "react";
import classes from "../../sass/components/card.module.scss";
import clsx from "clsx";

interface CardProps {
	children?: ReactNode
}
function Card({children}:CardProps) {
	return (
		<div className={clsx(classes.card)}>
			{children}
		</div>
	)
}
export default Card