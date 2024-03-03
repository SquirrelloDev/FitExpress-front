import {DayFlexi} from "../types/dbtypes/DayFlexi";
import {useOneDailyOrderListQuery} from "../queries/daily-orders/listing";
import {parseIntoMidnight} from "../utils/dates";
import {useMemo} from "react";

function useFlexiList(currentDate: Date, data: DayFlexi, token: string, orderId: string){
    const {data: dailyData, isLoading} = useOneDailyOrderListQuery({token, date: parseIntoMidnight(currentDate).toISOString()})
    const orders = useMemo(() => {
        console.log(dailyData)
        if(!isLoading && dailyData?.daily !== undefined){
            const order = dailyData.daily.orders.find(order => order.order_id._id === orderId);
            if (order) {
                return order.selected_meals
            }
        }
      return [data.morning_meals[0], data.lunch_meals[0], data.dinner_meals[0], data.teatime_meals[0], data.supper_meals[0]]
        
    },[isLoading, dailyData, data.dinner_meals, data.lunch_meals, data.morning_meals, data.supper_meals, data.teatime_meals, orderId])
    return orders
}
export default useFlexiList