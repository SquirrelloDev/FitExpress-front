import {useCallback} from "react";
import {Diet} from "../types/dbtypes/Diet";

function useCartArray() {
    const filterCartArray = useCallback((dietArr: Diet[], cartItemsArr: string[]) => {
        const userCartDiets = cartItemsArr.map(cartItem => {
            const foundDiet = dietArr.find(diet => diet._id === cartItem);
            return foundDiet
        })
        return userCartDiets
    }, [])
    return filterCartArray
}
export default useCartArray