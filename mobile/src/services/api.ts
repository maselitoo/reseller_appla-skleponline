// Centralny serwis API – te same endpointy co PWA
import AsyncStorage from '@react-native-async-storage/async-storage'

const API_URL = 'http://localhost:5000/api'

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = await AsyncStorage.getItem('token')
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }
  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers })
  if (!response.ok) {
    const err = await response.json().catch(() => ({ message: 'Błąd serwera' }))
    throw new Error(err.message || `HTTP ${response.status}`)
  }
  return response.json()
}

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface AuthUser {
  _id: string
  name: string
  email: string
  role: string
  token: string
}

export interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  inStock: boolean
  countInStock: number
  rating: number
  discount: number
}

export interface ProductsResponse {
  products: Product[]
  page: number
  pages: number
  total: number
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────

export const authApi = {
  login: (email: string, password: string) =>
    request<AuthUser>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (name: string, email: string, password: string) =>
    request<AuthUser>('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────

export const productsApi = {
  getAll: (params?: { category?: string; sortBy?: string }) => {
    const q = new URLSearchParams()
    if (params?.category && params.category !== 'All') q.set('category', params.category)
    if (params?.sortBy) q.set('sortBy', params.sortBy)
    const qs = q.toString()
    return request<ProductsResponse>(`/products${qs ? `?${qs}` : ''}`)
  },
}

// ─── ORDERS ──────────────────────────────────────────────────────────────────

export interface OrderItem {
  product: string
  name: string
  image: string
  price: number
  quantity: number
}

export const ordersApi = {
  create: (orderItems: OrderItem[], totalPrice: number) =>
    request<{ _id: string }>('/orders', {
      method: 'POST',
      body: JSON.stringify({ orderItems, totalPrice, shippingAddress: {}, paymentMethod: 'BLIK' }),
    }),
}
