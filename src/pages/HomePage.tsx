import NoOrders from "../layouts/homepage/NoOrders";
import classes from "../sass/pages/home.module.scss";

function HomePage() {
	return (
		<div className={classes.home}>
			<h1>Cześć Derek</h1>
			<NoOrders/>
		</div>
	)
}
export default HomePage;