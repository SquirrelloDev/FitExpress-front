import {UserRole} from "../../utils/userRoles";
import {Address} from "./Address";
import {Promocode} from "./Promocode";
import {HealthData} from "./HealthData";

export type UserData = {
    id: string,
    name: string,
    role: UserRole,
    healthDataNotFilled?: boolean
    token: string
}
export type UserFullData = {
    _id: string,
    name: string,

    email: string,
    role: UserRole,
    birth_date: Date,
    addresses: Address[],
    redeemed_codes: Promocode[],
    health_data: HealthData,
    phone: string
}