import {UserPrefs} from "../types/userPrefs";
import {create} from "zustand";
import {persist} from "zustand/middleware";

interface UserPrefsStore {
    userPrefs: UserPrefs
    setUserPrefs: (userPrefs: UserPrefs) => void,
    clearPrefs: () => void
}
const getCleanPrefs = ():UserPrefs => {
  return {
      calories: -1,
      user_goal: ''
  }
}
const useUserPrefsStore = create<UserPrefsStore>(persist((set) => ({
    userPrefs: getCleanPrefs(),
    setUserPrefs: (userPrefs) => {
        set({
            userPrefs: {
                calories: userPrefs.calories,
                user_goal: userPrefs.user_goal
            }
        })
    },
    clearPrefs: () => {
        set({userPrefs: getCleanPrefs()})
    }
}), {name: 'fit:prefs'}));
export default useUserPrefsStore;