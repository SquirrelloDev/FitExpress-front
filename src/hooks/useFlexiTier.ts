import {Meal} from "../types/dbtypes/Meal";
import {useMemo} from "react";

const getTierByIdx = (idx: number):number => {
    if(idx < 3) return 1
    if(idx === 3) return 2
    if(idx > 3) return  3
    return 1
}
function useFlexiTier(dayPartMeals: Meal[]) {
    const mealInfo = useMemo<{meal: Meal, tier: number}[]>(() => {
        const mealArr = dayPartMeals.map((meal, idx) => {
            return {meal, tier: getTierByIdx(idx)}
        })
        return mealArr
    }, [dayPartMeals])
    return mealInfo
}
export default useFlexiTier