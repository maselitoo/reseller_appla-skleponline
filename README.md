# 🍎 Reseller Apple – Sklep Online

> Projekt semestralny: Projektowanie i programowanie aplikacji PWA i mobilnych cross-platform

## 🚀 Szybki start (TL;DR)

```bash
# 1. Sklonuj repo
git clone https://github.com/maselitoo/reseller_appla-skleponline.git
cd reseller_appla-skleponline

# 2. Backend
cd backend && npm install && npm run seed && node src/index.js

# 3. Frontend (nowy terminal)
cd frontend && npm install && npm run dev
# Otwórz http://localhost:5173

# 4. Mobile (nowy terminal)
cd mobile && npm install && npx expo start
# Skanuj QR w Expo Go
```

**Dane testowe:**
| Email | Hasło | Rola |
|-------|-------|------|
| jan@example.com | password123 | user |
| admin@resellerapple.pl | admin123 | admin |


---

## 1. Opis aplikacji

**Reseller Apple** to sklep internetowy z produktami Apple (iPhone, MacBook, iPad, Apple Watch, AirPods) składający się z trzech warstw:

- **Backend** – REST API serwujące dane dla obu klientów
- **PWA** – aplikacja webowa instalowalna w przeglądarce, działająca offline
- **Mobile** – aplikacja mobilna na Android/iOS (React Native + Expo)

**Grupa docelowa:** Klienci szukający produktów Apple w Polsce  
**Język:** Polski 🇵🇱  
**Ceny w PLN**

### Główne funkcjonalności
- 📦 Przeglądanie produktów z filtrowaniem po kategorii i sortowaniem
- 🔐 Rejestracja i logowanie (JWT)
- 🛒 Koszyk zakupowy z persistencją (localStorage / AsyncStorage)
- 📱 Instalowalna PWA z trybem offline
- 📍 Natywna geolokalizacja w aplikacji mobilnej
- 📦 Składanie zamówień przez oba klienty

---

## 2. Architektura systemu

```
┌─────────────────────────────────────────────────────────────┐
│                         KLIENCI                             │
│                                                             │
│   ┌──────────────────┐      ┌──────────────────────┐       │
│   │   PWA (React)    │      │  Mobile (React Native) │       │
│   │   Vite + TS      │      │  Expo + TypeScript    │       │
│   │   Port 5173      │      │  Android / iOS        │       │
│   └────────┬─────────┘      └──────────┬────────────┘       │
│            │                            │                   │
│            └────────────┬───────────────┘                   │
│                         │ HTTP / REST API                   │
└─────────────────────────┼───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                    BACKEND (Node.js)                        │
│                                                             │
│   Express.js  ·  JWT Auth  ·  Helmet  ·  Rate Limiting     │
│   Port 5000                                                 │
└─────────────────────────┬───────────────────────────────────┘
                          │ Mongoose ODM
┌─────────────────────────▼───────────────────────────────────┐
│                  BAZA DANYCH (MongoDB)                      │
│                                                             │
│   Collections: users · products · orders                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Wybrana technologia

| Warstwa | Technologia | Uzasadnienie |
|---------|-------------|--------------|
| Backend | Node.js + Express | Szybki development, duży ekosystem, JavaScript full-stack |
| Baza danych | MongoDB + Mongoose | Elastyczny schemat, dobry fit dla katalogu produktów |
| PWA | React 19 + Vite + TypeScript | Nowoczesny stos, szybki HMR, TypeScript dla bezpieczeństwa typów |
| Mobile | React Native + Expo | Współdzielenie logiki z PWA, szybkie prototypowanie, Expo Go |
| Auth | JWT | Bezstanowy, działa zarówno w PWA jak i mobile |
| Deploy Backend | Render.com | Darmowy plan, auto-deploy z GitHub |
| Deploy PWA | Vercel | Darmowy plan, CDN, HTTPS automatycznie |

---

## 4. Opis API

### Auth

| Metoda | Endpoint | Opis | Auth |
|--------|----------|------|------|
| POST | `/api/auth/register` | Rejestracja użytkownika | Publiczny |
| POST | `/api/auth/login` | Logowanie, zwraca JWT | Publiczny |
| GET | `/api/auth/profile` | Pobierz profil | 🔒 JWT |
| PUT | `/api/auth/profile` | Aktualizuj profil | 🔒 JWT |
| GET | `/api/auth/users` | Lista użytkowników | 🔒 Admin |
| DELETE | `/api/auth/users/:id` | Usuń użytkownika | 🔒 Admin |

### Products

| Metoda | Endpoint | Opis | Auth |
|--------|----------|------|------|
| GET | `/api/products` | Lista produktów (filtr, sort, paginacja) | Publiczny |
| GET | `/api/products/:id` | Szczegóły produktu | Publiczny |
| GET | `/api/products/featured` | Wyróżnione produkty | Publiczny |
| GET | `/api/products/categories` | Lista kategorii | Publiczny |
| POST | `/api/products` | Utwórz produkt | 🔒 Admin |
| PUT | `/api/products/:id` | Aktualizuj produkt | 🔒 Admin |
| DELETE | `/api/products/:id` | Usuń produkt | 🔒 Admin |
| POST | `/api/products/:id/reviews` | Dodaj recenzję | 🔒 JWT |

**Parametry GET /api/products:**
- `?category=iPhone` – filtr kategorii
- `?sortBy=price-asc|price-desc|rating|newest` – sortowanie
- `?keyword=macbook` – wyszukiwanie tekstowe
- `?page=1` – paginacja (12 produktów/strona)

### Orders

| Metoda | Endpoint | Opis | Auth |
|--------|----------|------|------|
| POST | `/api/orders` | Złóż zamówienie | 🔒 JWT |
| GET | `/api/orders/myorders` | Moje zamówienia | 🔒 JWT |
| GET | `/api/orders/:id` | Szczegóły zamówienia | 🔒 JWT |
| GET | `/api/orders` | Wszystkie zamówienia | 🔒 Admin |

---

## 5. Design System

### Paleta kolorów

| Nazwa | HEX | Użycie |
|-------|-----|--------|
| Primary Blue | `#0071e3` | Przyciski, linki, akcenty |
| Dark | `#1d1d1f` | Główny tekst |
| Muted | `#6e6e73` | Tekst drugorzędny |
| Background | `#ffffff` | Tło główne |
| Surface | `#f5f5f7` | Tło kart, sekcji |
| Border | `#d2d2d7` | Obramowania |
| Danger | `#ff3b30` | Błędy, brak w magazynie |
| Success | `#34c759` | Potwierdzenia |

### Typografia
- Font: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Nagłówki: 700 weight
- Ciało: 400–500 weight
- Rozmiar bazowy: 15–16px

### Kluczowe komponenty UI
- **btn-primary** – niebieski przycisk z border-radius 980px (pill shape)
- **btn-secondary** – outlined niebieski przycisk
- **product-card** – karta produktu z obrazkiem, nazwą, ceną i przyciskiem
- **filter-btn** – przycisk filtrowania kategorii

---

## 6. Opis funkcjonalności

### PWA (frontend/)
- ✅ Strona główna z hero section i kategoriami
- ✅ Lista produktów z filtrowaniem (kategoria) i sortowaniem (cena, nazwa)
- ✅ Koszyk z zarządzaniem ilością, podsumowaniem i składaniem zamówień
- ✅ Logowanie i rejestracja (połączone z backend API)
- ✅ Strona O nas i Kontakt
- ✅ Service Worker z cache-first dla obrazków, network-first dla API
- ✅ manifest.json – aplikacja instalowalna z ikony przeglądarki
- ✅ Tryb offline – fallback dane gdy brak internetu
- ✅ Koszyk persistowany w localStorage
- ✅ Responsywny design (mobile + desktop)

### Mobile (mobile/)
- ✅ Ekran główny (Home) z kategoriami i funkcjami sklepu
- ✅ Ekran produktów z filtrowaniem po kategorii
- ✅ Koszyk z zarządzaniem ilością i składaniem zamówień
- ✅ Ekran logowania / rejestracji
- ✅ Ekran profilu z **geolokalizacją** (natywna funkcja GPS)
- ✅ Koszyk persistowany w AsyncStorage
- ✅ Ten sam backend API co PWA
- ✅ Nawigacja tab-bar (5 zakładek)

### Backend (backend/)
- ✅ REST API z pełnym CRUD dla produktów, użytkowników, zamówień
- ✅ Rejestracja i logowanie z JWT
- ✅ Filtrowanie, sortowanie i paginacja produktów
- ✅ System recenzji produktów
- ✅ Role: user / admin
- ✅ Seed data (npm run seed)

---

## 7. Zabezpieczenia

| Mechanizm | Implementacja |
|-----------|---------------|
| Hasła | bcryptjs, salt rounds = 10 |
| Auth | JWT, 7-dniowy token |
| CORS | Skonfigurowany tylko dla frontend URL |
| Rate Limiting | 100 req / 15 min / IP |
| Headers | helmet.js (XSS, CSRF, clickjacking) |
| Walidacja | express-validator na wszystkich endpointach |
| HTTPS | Automatycznie przez Vercel/Render |
| Token storage | localStorage (PWA), AsyncStorage (mobile) |
| Admin routes | Middleware sprawdzający `role === 'admin'` |

---

## 8. Testowanie

Patrz: [TEST_REPORT.md](./TEST_REPORT.md)

- 11 testów jednostkowych (Jest + Supertest)
- Testy manualne wszystkich endpointów (Postman)
- Testy integracyjne frontend ↔ backend

---

## 9. Zrzuty ekranu

> Uruchom aplikację i zrób screenshots z:
> - PWA: strona główna, lista produktów, koszyk, logowanie
> - Mobile: HomeScreen, ProductsScreen, CartScreen, LoginScreen, ProfileScreen (geolokalizacja)

---

## 10. Instrukcja uruchomienia

### Wymagania
- Node.js >= 18
- MongoDB (lokalnie lub Atlas)
- Expo Go na telefonie (opcjonalnie)

### Backend
```bash
cd backend
cp .env.example .env        # uzupełnij MONGODB_URI i JWT_SECRET
npm install
npm run seed                 # załaduj dane testowe
npm run dev                  # http://localhost:5000
```

### PWA
```bash
cd frontend
npm install
npm run dev                  # http://localhost:5173
npm run build                # build produkcyjny (generuje SW + manifest)
```

### Mobile
```bash
cd mobile
npm install
npx expo start               # skanuj QR w Expo Go
npx expo start --android     # emulator Android
```

### Dane testowe (po npm run seed)
| Email | Hasło | Rola |
|-------|-------|------|
| admin@resellerapple.pl | admin123 | admin |
| jan@example.com | password123 | user |

---

## 11. Napotkane problemy

| Problem | Rozwiązanie |
|---------|-------------|
| Frontend nie komunikował się z backendem | Skonfigurowano Vite proxy `/api → localhost:5000`, wdrożono centralny serwis `api.ts` |
| Login używał symulacji zamiast API | Zastąpiono `setTimeout` rzeczywistym `fetch` do `/api/auth/login` |
| Koszyk resetował się przy odświeżeniu | Dodano persystencję localStorage/AsyncStorage |
| Brak PWA (0 pkt) | Dodano `vite-plugin-pwa` z Service Workerem i manifest.json |
| Typowanie id – `number` vs `string` | Ujednolicono `CartItem.id: string` z `Product._id: string` z MongoDB |
| Aplikacja mobilna nie istniała | Zbudowano od zera w React Native + Expo z 5 ekranami |

---

## 12. Możliwości rozwoju

- 💳 Integracja płatności Stripe / PayU
- 📸 Skaner kodów kreskowych (kamera) w aplikacji mobilnej
- 🔔 Push notifications (expo-notifications) dla statusu zamówienia
- 🌙 Tryb ciemny (dark mode)
- 📊 Panel admina do zarządzania produktami i zamówieniami
- 🔍 Zaawansowane wyszukiwanie z Elasticsearch
- 📦 Śledzenie zamówień w czasie rzeczywistym (WebSocket)
- 🌍 Wielojęzyczność (i18n)

---

*Made with ❤️ by Team Reseller Apple*
