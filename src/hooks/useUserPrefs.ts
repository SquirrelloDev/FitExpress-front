import useUserPrefsStore from "../stores/userPrefsStore";
import {useCallback} from "react";
import {UserPrefs} from "../types/userPrefs";
import {useNavigate} from "react-router-dom";
import {appRoutes} from "../utils/routes";

function useUserPrefs() {
    const navigate = useNavigate()
    const setUserPrefs = useUserPrefsStore((state) => state.setUserPrefs)
    const userPrefsSlice = useUserPrefsStore((state) => state.userPrefs)
    const assignHealthStore = useCallback((data: UserPrefs) => {
        setUserPrefs(data)
        navigate(appRoutes.home)
    }, [setUserPrefs, navigate])
    const assignHelperBadges = (availableCalories: number[]): {value: number, name: string}[] => {
        const closestVal = availableCalories.reduce((closest, current) => {
            const currentDiff = Math.abs(current - userPrefsSlice.calories);
            const closestDiff = Math.abs(closest - userPrefsSlice.calories);
            return currentDiff < closestDiff ? current : closest
        })
        const closestValIdx = availableCalories.findIndex(cal => cal === closestVal);
        let firstAdjacent, secondAdjacent;
        let returnVal: {value: number, name: string}[] = [];
        switch (userPrefsSlice.user_goal){
            case  'burn':
                firstAdjacent = availableCalories[closestValIdx + 1];
                secondAdjacent = availableCalories[closestValIdx + 2];
                returnVal = [{value: closestVal, name: 'Redukcja'}, {value: firstAdjacent, name: 'Utrzymanie wagi'}, {value: secondAdjacent, name: 'Surplus'}]
                break;
            case 'balance':
                firstAdjacent = availableCalories[closestValIdx - 1];
                secondAdjacent = availableCalories[closestValIdx + 1];
                returnVal = [{value: firstAdjacent, name: 'Redukcja'}, {value: closestVal, name: 'Utrzymanie wagi'}, {value: secondAdjacent, name: 'Surplus'}]
                break;
            case 'surplus':
                firstAdjacent = availableCalories[closestValIdx - 2];
                secondAdjacent = availableCalories[closestValIdx - 1];
                returnVal = [{value: firstAdjacent, name: 'Redukcja'}, {value: secondAdjacent, name: 'Utrzymanie wagi'}, {value: closestVal, name: 'Surplus'}]
                break;
        }
        return returnVal;
    }
    return {assignHealthStore, assignHelperBadges}
}
export default useUserPrefs;