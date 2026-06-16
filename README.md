# Cheezious Backend 🧀🍕

**A microservices backend for the Cheezious food ordering & delivery platform.**

This is a **NestJS (TypeScript)** backend split into small, focused services
that talk to each other through an **API gateway**.

---

## 📖 Overview

Instead of one big app, the work is split into several small **microservices**,
each responsible for one thing (products, orders, riders, etc.). A single
**API gateway** sits in front of them as the one entry point for client apps
(customer app, rider app, admin panel). Background jobs run in the **scheduler**.

This keeps each part small, easy to understand, and independently deployable.

---

## 🧩 Services

| Service | Folder | Responsibility | Demo port |
|---------|--------|----------------|-----------|
| **API Gateway** | `api-gateway/` | Single entry point; routes requests to the right service | 3000 |
| **Product** | `micro-services/product-service/` | Menu / products | 3001 |
| **Customer** | `micro-services/customer-service/` | Customers & accounts | 3002 |
| **Order** | `micro-services/order-service/` | Orders & order status | 3003 |
| **Rider** | `micro-services/rider-service/` | Delivery riders | 3004 |
| **Dispatch** | `micro-services/dispatch-service/` | Assigns riders to orders (scoring engine) | 3005 |
| **Notification** | `micro-services/notification-service/` | Push / SMS notifications | 3006 |
| **Scheduler** | `scheduler/` | Background scheduled jobs | — |

> ✅ The **product-service** has runnable demo code. The other services are
> scaffolded (empty files) and follow the same NestJS pattern.

---

## 📂 Structure

```
cheezious-backend/
├── api-gateway/        → single entry point; routes requests to services
├── micro-services/
│   ├── customer-service/      → customers & accounts
│   ├── product-service/       → menu / products   ← demo code added here
│   ├── order-service/         → orders
│   ├── rider-service/         → delivery riders
│   ├── dispatch-service/      → assigns riders to orders (scoring engine)
│   └── notification-service/  → push / SMS notifications
├── scheduler/          → background scheduled jobs
├── .env.example        → sample environment variables
└── docker-compose.yml  → runs everything together
```

Each service follows the same NestJS layout:
```
src/
├── main.ts                  → boots the service
├── app.module.ts           → root module
├── config/                 → settings (port, db url)
├── main/<feature>/         → controller + service + module
└── schemas/                → data shapes (MongoDB / Sequelize)
```

---

## 🔄 How a request flows

```
[ Customer App ]
      │  HTTP
      ▼
[ API Gateway ]  ──▶  [ Product Service ]   (browse the menu)
      │            ──▶  [ Order Service ]     (place an order)
      │                      │
      │                      ▼
      │                [ Dispatch Service ]   (pick the best rider — scoring engine)
      │                      │
      │                      ▼
      │                [ Notification Service ] (tell the customer & rider)
      ▼
   response
```

---

## 🛠️ Tech

- **NestJS + TypeScript** — service framework
- **MongoDB (Mongoose)** + **Sequelize** — data storage
- **Docker / docker-compose** — run all services together
- **REST** between client and gateway (services can also talk over a message bus)

---

## ▶️ Run the demo (product-service)

The **product-service** contains a small runnable demo (in-memory sample
products, no database needed) showing the standard NestJS layout:
`main.ts → app.module → product.module → controller → service → schema`.

```bash
cd micro-services/product-service
npm install
npm run start
# → 🧀 product-service running on http://localhost:3001
```

### Demo API (product-service)

| Method | Endpoint | What it does |
|--------|----------|--------------|
| GET | `/products` | List the full menu |
| GET | `/products/:id` | Get one product |
| POST | `/products` | Add a product (`{ name, category, price, available }`) |

Sample menu items: Cheezious Special Pizza, Cheese Lava Burger, Garlic Bread,
Cold Drink (prices in PKR).

---

## ⚙️ Setup (full project — planned)

```bash
# 1) Copy the env file and adjust values
cp .env.example .env

# 2) Install dependencies in each service you want to run
cd micro-services/product-service && npm install

# 3) Or run everything together with Docker
docker-compose up
```

Common environment variables (per service):
```
PORT=3001
MONGO_URL=mongodb://localhost:27017/cheezious
```

---

## 📜 Conventions

- Each service is **independent** — its own `package.json`, `tsconfig.json`, `Dockerfile`.
- Code lives under `src/main/<feature>/` as **controller + service + module**.
- Data shapes live under `src/schemas/`.
- Demo code uses **in-memory data** and is clearly marked with `— Demo` comments.

---

## 🚧 Status

- ✅ `product-service` — demo code added (runnable)
- 🔲 Other services — scaffolded, ready to be filled in following the same pattern
