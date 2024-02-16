import {create} from "zustand";
import {persist} from "zustand/middleware";
interface CartStore {
    cartItems: string[]
    addItem: (item: string) => void
    getCount: () => number
    deleteItem: (idx: number) => void
    clearCart: () => void
}
const initCart = (): string[] => {
    return []
}
const useCartStore = create<CartStore>(persist<CartStore>(
    (set,get) => ({
        cartItems: initCart(),
        addItem: (item) => {
            set((state) => {
                return {cartItems: state.cartItems.concat(item)}
            })
        },
        getCount: () => {
            return get().cartItems.length
        },
        deleteItem: (idx) => {
            set((state)=> {
                return {cartItems: state.cartItems.filter((cartItem, index) => idx !== index)}
            })
        },
        clearCart: () => {
            set(() => {
                return {cartItems: initCart()}
            })
        }
    }), {name: 'fit:cart'}
))
export default useCartStore