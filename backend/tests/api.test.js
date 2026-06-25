import request from 'supertest'
import app from '../src/server.js'
import mongoose from 'mongoose'

// Testy jednostkowe backendu – auth + products API
// Uruchom: npm test (w folderze backend/)

describe('Auth API', () => {
  const testUser = {
    name: 'Test User',
    email: `test_${Date.now()}@example.com`,
    password: 'password123',
  }
  let token = ''

  test('POST /api/auth/register – rejestracja nowego użytkownika', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser)
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('token')
    expect(res.body.email).toBe(testUser.email)
    token = res.body.token
  })

  test('POST /api/auth/register – duplikat emaila zwraca 400', async () => {
    const res = await request(app).post('/api/auth/register').send(testUser)
    expect(res.statusCode).toBe(400)
  })

  test('POST /api/auth/login – poprawne dane zwracają token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: testUser.password })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
    token = res.body.token
  })

  test('POST /api/auth/login – błędne hasło zwraca 401', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: 'wrong_password' })
    expect(res.statusCode).toBe(401)
  })

  test('GET /api/auth/profile – wymaga autoryzacji', async () => {
    const res = await request(app).get('/api/auth/profile')
    expect(res.statusCode).toBe(401)
  })

  test('GET /api/auth/profile – zwraca profil z tokenem', async () => {
    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.email).toBe(testUser.email)
  })
})

describe('Products API', () => {
  test('GET /api/products – zwraca listę produktów', async () => {
    const res = await request(app).get('/api/products')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('products')
    expect(Array.isArray(res.body.products)).toBe(true)
  })

  test('GET /api/products?category=iPhone – filtruje po kategorii', async () => {
    const res = await request(app).get('/api/products?category=iPhone')
    expect(res.statusCode).toBe(200)
    res.body.products.forEach((p: { category: string }) => {
      expect(p.category).toBe('iPhone')
    })
  })

  test('GET /api/products?sortBy=price-asc – sortuje rosnąco', async () => {
    const res = await request(app).get('/api/products?sortBy=price-asc')
    expect(res.statusCode).toBe(200)
    const prices = res.body.products.map((p: { price: number }) => p.price)
    const sorted = [...prices].sort((a, b) => a - b)
    expect(prices).toEqual(sorted)
  })

  test('GET /api/products/:id – zwraca 404 dla nieistniejącego ID', async () => {
    const res = await request(app).get('/api/products/000000000000000000000000')
    expect(res.statusCode).toBe(404)
  })

  test('GET / – API health check', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('message')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
