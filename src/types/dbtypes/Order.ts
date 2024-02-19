import {Diet} from "./Diet";
import {UserFullData} from "./UserData";
import {Address} from "./Address";

export type Order = {
    _id: string,
    name: string,
    diet_id: Diet,
    user_id: UserFullData,
    is_active: boolean,
    address_id: Address,
    price: number,
    sub_date: {
        from: Date,
        to: Date
    },
    calories: number,
    with_weekends: boolean
    flexi_tier?: string
}