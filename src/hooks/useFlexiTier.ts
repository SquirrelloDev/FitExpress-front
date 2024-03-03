import {Meal} from "../types/dbtypes/Meal";
import {useMemo} from "react";

function useFlexiTier(dayPartMeals: Meal[]) {
    const mealInfo = useMemo<{meal: Meal, tier: number}[]>(() => {
        const mealArr = dayPartMeals.map((meal, idx) => {
            if(idx < 3) return {meal: meal, tier: 1}
            if(idx === 3) return {meal: meal, tier: 2}
            if(idx > 3) return  {meal: meal, tier: 3}
        })
        return mealArr
    }, [dayPartMeals])
    return mealInfo
}
export default useFlexiTier