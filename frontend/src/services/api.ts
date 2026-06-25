// Centralny serwis API – wszystkie wywołania do backendu przez ten plik

const API_URL = import.meta.env.VITE_API_URL || '/api'

// Pomocnicza funkcja do żądań HTTP
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('token')

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Błąd serwera' }))
    throw new Error(error.message || `HTTP ${response.status}`)
  }

  return response.json()
}

// ─── AUTH ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  _id: string
  name: string
  email: string
  role: string
  token: string
}

export const authApi = {
  login: (email: string, password: string) =>
    request<AuthUser>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string) =>
    request<AuthUser>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  getProfile: () => request<AuthUser>('/auth/profile'),
}

// ─── PRODUCTS ────────────────────────────────────────────────────────────────

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
  numReviews: number
  featured: boolean
  discount: number
}

export interface ProductsResponse {
  products: Product[]
  page: number
  pages: number
  total: number
}

export const productsApi = {
  getAll: (params?: {
    category?: string
    sortBy?: string
    keyword?: string
    page?: number
  }) => {
    const query = new URLSearchParams()
    if (params?.category && params.category !== 'All')
      query.set('category', params.category)
    if (params?.sortBy) query.set('sortBy', params.sortBy)
    if (params?.keyword) query.set('keyword', params.keyword)
    if (params?.page) query.set('page', String(params.page))
    const qs = query.toString()
    return request<ProductsResponse>(`/products${qs ? `?${qs}` : ''}`)
  },

  getById: (id: string) => request<Product>(`/products/${id}`),

  getFeatured: () => request<Product[]>('/products/featured'),
}

// ─── ORDERS ──────────────────────────────────────────────────────────────────

export interface OrderItem {
  product: string
  name: string
  image: string
  price: number
  quantity: number
}

export interface Order {
  _id: string
  orderItems: OrderItem[]
  totalPrice: number
  status: string
  createdAt: string
}

export const ordersApi = {
  create: (orderItems: OrderItem[], totalPrice: number) =>
    request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify({
        orderItems,
        totalPrice,
        shippingAddress: {},
        paymentMethod: 'BLIK',
      }),
    }),

  getMyOrders: () => request<Order[]>('/orders/myorders'),
}
