import {create} from "zustand";
import {persist} from "zustand/middleware";
interface CartStore {
    cartItems: string[]
    appliedPromocode: string
    applyPromocode: (promoId: string) => void
    addItem: (item: string) => void
    getCount: () => number
    deleteItem: (idx: number) => void
    clearCart: () => void
}
const initCart = (): string[] => {
    return []
}
const useCartStore = create(persist<CartStore>(
    (set,get) => ({
        cartItems: initCart(),
        appliedPromocode: '',
        applyPromocode: (promoId) => {
          set(() => {
              return {cartItems: get().cartItems, appliedPromocode: promoId}
          })
        },
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
                // @ts-expect-error cartItem isn't used here
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