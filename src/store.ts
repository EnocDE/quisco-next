import { create } from "zustand"
import { OrderItem } from "./types"
import { Product } from "@prisma/client"

interface Store {
  order: OrderItem[],
  addToOrder: (product: Product) => void
  increaseQuantity: (id: Product['id']) => void
  decreaseQuantity: (id: Product['id']) => void
  removeItem: (id: Product['id']) => void
  clearOrder: () => void
}

const MAX_ITEMS = 5;
const MIN_ITEMS = 1;

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {
    const {categoryId, image, ...data} = product
    let order : OrderItem[] = []
    
    if (get().order.find(item => item.id === data.id)) {
      get().increaseQuantity(data.id)
    } else {
      order = [...get().order, {...data, quantity: 1, subtotal: 1 * data.price}]
      set(() => ({
        order
      }))
    }
  },
  increaseQuantity: (id) => {
    set((state) => ({
      order:  state.order.map(item => item.id === id 
        ? { 
            ...item, 
            quantity: item.quantity < MAX_ITEMS ? item.quantity + 1 : item.quantity, 
            subtotal: item.quantity < MAX_ITEMS ? item.price * (item.quantity + 1) : item.subtotal
          }
        : item)
    }))
  },
  decreaseQuantity: (id) => {
    const order =  get().order.map(item => item.id === id 
      ? {
          ...item, 
          quantity: item.quantity > MIN_ITEMS ? item.quantity - 1 : item.quantity,
          subtotal: item.quantity > MIN_ITEMS ? item.price * (item.quantity - 1) : item.price
        }
      : item)
    set(() => ({
      order
    })) 
  },
  removeItem: (id) => {
    set((state) => ({
      order:  state.order.filter(item => item.id !== id)
    }))
  },
  clearOrder: () => {
    set(() => ({
      order: []
    }))
  }
}))