import {Tabs} from "@mantine/core";
import {useFixedByDayQuery} from "../../queries/fixed/listing";
import {useEffect} from "react";
import {Order} from "../../types/dbtypes/Order";
import MenuFixed from "../MenuFixed/MenuFixed";
import {useFlexiByDayQuery} from "../../queries/flexi/listing";
import MenuFlexi from "../MenuFlexi/MenuFlexi";


interface MenuViewProps {
	order: Order,
	token: string,
	currentDateListing: Date
}
export function MenuView({order, token, currentDateListing}:MenuViewProps) {
	const {data, isLoading, refetch} = useFixedByDayQuery({token, date: currentDateListing})
	const {data: flexiData, isLoading: isFlexiLoading, refetch: refetchFlexi} = useFlexiByDayQuery({token, date: currentDateListing})
	useEffect(() => {
		if(order.diet_id.diet_type === 'Fixed'){
			refetch()
		}
		else if(order.diet_id.diet_type === 'Flexi'){
			refetchFlexi()
		}
	}, [currentDateListing, order.diet_id.diet_type, refetch, refetchFlexi])
	return (
		<>
		<Tabs.Panel value={order.name}>
			<div>
				{!isLoading && order.diet_id.diet_type === 'Fixed' && data?.day && <MenuFixed data={data!.day} dietId={order.diet_id._id} />}
				{!isFlexiLoading && order.diet_id.diet_type === 'Flexi' && flexiData?.day && <MenuFlexi token={token} flexiTier={order.flexi_tier!} orderId={order._id} dietId={order.diet_id._id} currentDateListing={currentDateListing} data={flexiData!.day} />}
			</div>
		</Tabs.Panel>
		</>
	)
}