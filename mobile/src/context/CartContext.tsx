import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType>({} as CartContextType)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Wczytaj koszyk z AsyncStorage przy starcie
  useEffect(() => {
    AsyncStorage.getItem('cart').then(saved => {
      if (saved) setCart(JSON.parse(saved))
    })
  }, [])

  // Zapisuj koszyk przy każdej zmianie
  useEffect(() => {
    AsyncStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(ci => ci.id === item.id)
      if (existing) return prev.map(ci => ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci)
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => setCart(prev => prev.filter(ci => ci.id !== id))

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) { removeFromCart(id); return }
    setCart(prev => prev.map(ci => ci.id === id ? { ...ci, quantity: qty } : ci))
  }

  const clearCart = () => setCart([])

  const totalItems = cart.reduce((sum, ci) => sum + ci.quantity, 0)
  const totalPrice = cart.reduce((sum, ci) => sum + ci.price * ci.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
