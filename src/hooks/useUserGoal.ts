import {useMemo} from "react";
import {palActive, palPassive, userGoals} from "../utils/palTypes";

function useUserHealthParser(goal: string, palActiveVal: number, palPassiveVal: number) {
    const userGoal = useMemo(() => {
        const foundGoal = userGoals.find(userGoal => userGoal.value === goal).label;
        return foundGoal ? foundGoal : 'N/A'
    }, [goal])
    const userPalActive = useMemo(() => {
        const foundPal = palActive.find(pal => pal.value === palActiveVal).label;
        return foundPal? foundPal: 'N/A'
    }, [palActiveVal])    
    const userPalPassive = useMemo(() => {
        const foundPal = palPassive.find(pal => pal.value === palPassiveVal).label;
        return foundPal? foundPal: 'N/A'
    }, [palPassiveVal])
    return {userGoal, userPalActive, userPalPassive}
}

export default useUserHealthParser