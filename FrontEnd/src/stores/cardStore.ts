import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  title: string
  price: number
}

interface CartState {
  cartItems: CartItem[]
  totalPrice: number
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
  isInCart: (id: string) => boolean
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      totalPrice: 0,

      addToCart: (item) => {
        const exists = get().cartItems.some((cartItem) => cartItem.id === item.id)
        let updatedCartItems

        if (exists) {

          updatedCartItems = get().cartItems.filter((cartItem) => cartItem.id !== item.id)
        } else {

          updatedCartItems = [...get().cartItems, item]
        }

        const updatedTotalPrice = updatedCartItems.reduce(
          (total, item) => total + item.price,
          0
        )

        set({ cartItems: updatedCartItems, totalPrice: updatedTotalPrice })
      },

      removeFromCart: (itemId) => {
        const updatedCartItems = get().cartItems.filter((item) => item.id !== itemId)
        const updatedTotalPrice = updatedCartItems.reduce(
          (total, item) => total + item.price,
          0
        )

        set({ cartItems: updatedCartItems, totalPrice: updatedTotalPrice })
      },

      clearCart: () => set({ cartItems: [], totalPrice: 0 }),

      isInCart: (id) => get().cartItems.some((item) => item.id === id),
    }),
    {
      name: 'cart-storage', 
    }
  )
)
