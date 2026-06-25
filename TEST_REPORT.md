# Raport z testów – Reseller Apple

## Środowisko testowe
- Framework: Jest + Supertest
- Data: 2025-01-15
- Backend: Node.js + Express + MongoDB
- Baza testowa: MongoDB in-memory (lokalna)

## Wyniki testów

### Auth API (6 testów)

| # | Test | Status | Opis |
|---|------|--------|------|
| 1 | POST /api/auth/register – nowy użytkownik | ✅ PASS | Zwraca 201 + JWT token |
| 2 | POST /api/auth/register – duplikat emaila | ✅ PASS | Zwraca 400 z komunikatem błędu |
| 3 | POST /api/auth/login – poprawne dane | ✅ PASS | Zwraca 200 + JWT token |
| 4 | POST /api/auth/login – błędne hasło | ✅ PASS | Zwraca 401 Unauthorized |
| 5 | GET /api/auth/profile – bez tokenu | ✅ PASS | Zwraca 401 Unauthorized |
| 6 | GET /api/auth/profile – z tokenem | ✅ PASS | Zwraca dane profilu użytkownika |

### Products API (5 testów)

| # | Test | Status | Opis |
|---|------|--------|------|
| 7 | GET /api/products – lista produktów | ✅ PASS | Zwraca 200 + array produktów z paginacją |
| 8 | GET /api/products?category=iPhone | ✅ PASS | Filtruje tylko produkty z kategorii iPhone |
| 9 | GET /api/products?sortBy=price-asc | ✅ PASS | Sortuje produkty od najtańszego |
| 10 | GET /api/products/:id – nieistniejące ID | ✅ PASS | Zwraca 404 Not Found |
| 11 | GET / – health check | ✅ PASS | Zwraca info o API |

## Podsumowanie

- **Łącznie testów:** 11
- **Zaliczone:** 11 ✅
- **Niezaliczone:** 0
- **Pokrycie kodu:** auth controller, product controller, middleware

## Testy manualne (Postman)

| Endpoint | Metoda | Status |
|----------|--------|--------|
| /api/auth/register | POST | ✅ OK |
| /api/auth/login | POST | ✅ OK |
| /api/auth/profile | GET | ✅ OK (wymaga JWT) |
| /api/products | GET | ✅ OK |
| /api/products?category=MacBook | GET | ✅ OK |
| /api/products/:id | GET | ✅ OK |
| /api/orders | POST | ✅ OK (wymaga JWT) |
| /api/orders/myorders | GET | ✅ OK (wymaga JWT) |

## Znalezione i naprawione błędy

| # | Błąd | Rozwiązanie |
|---|------|-------------|
| 1 | Login.tsx używał setTimeout zamiast wywołania API | Zastąpiono rzeczywistym `POST /api/auth/login` |
| 2 | Products.tsx miał zakodowane dane statyczne | Zastąpiono `fetch('/api/products')` z fallback offline |
| 3 | CartContext resetował koszyk po odświeżeniu | Dodano `localStorage` persistence |
| 4 | Brak manifest.json i Service Workera w PWA | Dodano `vite-plugin-pwa` z pełną konfiguracją |
| 5 | Cart używał `id: number` zamiast `string` | Ujednolicono typy z `Product._id: string` |
