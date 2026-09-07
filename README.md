# 💎 KISUUFIM — Handmade Jewelry E-Commerce

**KISUUFIM | כיסופים** is a full-stack e-commerce platform for handmade jewelry.

The project combines a warm boutique shopping experience with a modern full-stack architecture, including product management, customer authentication, order management, image storage, multilingual support, and a foundation for checkout and online payments.

The visual identity of KISUUFIM is inspired by **memory, touch, longing, and meaningful moments we choose to keep close**.

---

## ✨ About KISUUFIM

KISUUFIM is more than a traditional jewelry catalog.

The brand experience is built around the idea that jewelry can represent a memory, a person, a touch, or a moment worth keeping close.

The website follows a **Modern Israeli Boutique / Quiet Luxury / Handmade** design language with warm natural tones, editorial photography, and a minimal shopping experience.

---

## ✨ Features

### 💍 Product Catalog

- Jewelry product catalog
- Product images
- Product descriptions
- Product pricing
- Stock management
- Active / inactive products
- Responsive product grid
- Product image fallback
- Soft delete and restore support

### 👤 Customer Accounts

- Customer registration
- Customer login
- JWT authentication
- Customer profile support
- Protected API routes
- Admin authorization

### 🛍️ Orders

- Create customer orders
- Multiple products per order
- Quantity and pricing information
- Shipping information
- Payment method support
- Payment status tracking
- Order status management

Supported order statuses include:

- Pending
- Paid
- Processing
- Shipped
- Completed
- Cancelled

### 🌍 Internationalization

The storefront supports:

- Hebrew
- English
- RTL / LTR switching
- Persistent language selection

Internationalization is implemented using **i18next** and **react-i18next**.

### 🛠️ Admin

The backend includes support for:

- Add products
- Edit products
- Soft delete products
- Restore products
- View all products
- Product image uploads
- View orders
- Update orders
- Delete orders
- Role-based admin access

---

## 🧱 Project Structure

```text
kissufim/
│
├── backEnd/
│   ├── src/
│   │   ├── controller/
│   │   │   ├── auth-controller.ts
│   │   │   ├── order-controller.ts
│   │   │   └── product-controller.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth-middleware.ts
│   │   │   └── error-middleware.ts
│   │   │
│   │   ├── model/
│   │   │   ├── client-error.ts
│   │   │   ├── enums.ts
│   │   │   ├── order-model.ts
│   │   │   ├── product-model.ts
│   │   │   └── user-model.ts
│   │   │
│   │   ├── services/
│   │   │   ├── auth-service.ts
│   │   │   ├── order-service.ts
│   │   │   └── product-service.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── app-config.ts
│   │   │   ├── dal.ts
│   │   │   └── product-image.ts
│   │   │
│   │   └── app.ts
│   │
│   ├── uploads/
│   │   └── products/
│   │
│   ├── docker-compose.yml
│   ├── package.json
│   └── tsconfig.json
│
├── frontEnd/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── footer/
│   │   │   ├── layout/
│   │   │   ├── menu/
│   │   │   ├── pages-area/
│   │   │   ├── products-area/
│   │   │   ├── routing/
│   │   │   └── users-area/
│   │   │
│   │   ├── i18n/
│   │   ├── models/
│   │   ├── service/
│   │   ├── theme/
│   │   └── utils/
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── dataBase/
│
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Material UI
- React Router
- Axios
- i18next
- react-i18next
- CSS

### Backend

- Node.js
- TypeScript
- Express
- REST API
- JWT
- bcrypt
- express-fileupload
- Helmet
- CORS

### Database

- MongoDB
- Mongoose

### Infrastructure

- Docker
- Docker Compose
- Git
- GitHub

---

## 🗄️ Database

KISUUFIM uses **MongoDB** with **Mongoose**.

The main application entities currently include:

```text
Users
  │
  ├── Authentication
  └── Customer information

Products
  │
  ├── Product information
  ├── Price
  ├── Stock
  ├── Category
  └── Image

Orders
  │
  ├── Customer
  ├── Products
  ├── Quantities
  ├── Total price
  ├── Shipping details
  ├── Payment
  └── Order status
```

---

## 🖼️ Product Images

Product images are uploaded through the backend and stored separately from the MongoDB documents.

MongoDB stores the image filename:

```text
imageName
```

The API exposes a generated public URL:

```text
/api/images/products/<image-name>
```

The storage path is configurable through environment variables so the project can use persistent Docker storage in production.

---

## 🔐 Authentication

Authentication is based on **JWT**.

Available authentication endpoints:

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

The JWT contains the user's ID and role and is used to protect authenticated and administrator routes.

---

## 💍 Product API

```text
GET      /api/products
GET      /api/products/:id

POST     /api/products
PUT      /api/products/:id
DELETE   /api/products/:id
PATCH    /api/products/:id/restore

GET      /api/admin/products
```

Public users receive active products, while administration routes support complete product management.

---

## 📦 Order API

```text
POST     /api/orders
GET      /api/orders/:id

GET      /api/admin/orders
PUT      /api/admin/orders/:id
DELETE   /api/admin/orders/:id
```

Orders store a snapshot of relevant product information, including product name, price, quantity, and image information.

---

## 🌍 Languages

KISUUFIM currently supports:

```text
🇮🇱 Hebrew
🇬🇧 English
```

The application automatically switches between:

```text
Hebrew  → RTL
English → LTR
```

The selected language is persisted in the browser.

---

## 🎨 Design System

The visual direction is based on:

**Modern Israeli Boutique · Quiet Luxury · Handmade**

Main colors:

```text
Dusty Rose     #BF7D83
Dark Rose      #A96C72
Light Rose     #E8D1D2
Warm Ivory     #FAF7F2
Champagne      #D8C6AE
Charcoal       #292524
Muted Text     #756C68
```

The storefront uses warm editorial imagery, natural light, cream fabrics, skin tones, and nostalgic visual elements to reinforce the KISUUFIM brand identity.

---

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/RonenCohen7/kissufim.git
```

Enter the project:

```bash
cd kissufim
```

---

## ⚙️ Backend

```bash
cd backEnd
npm install
```

Create the required `.env` configuration.

Example:

```env
MONGO_CONNECTION_STRING=mongodb://localhost:27018/kissufim
PORT=4000

IMAGES_URL=http://localhost:4000/api/images/products/
PRODUCTS_IMAGES_PATH=./uploads/products

JWT_SECRET=your_secret
```

Start the backend:

```bash
npm run dev
```

The API runs locally on:

```text
http://localhost:4000
```

---

## 💻 Frontend

Open another terminal:

```bash
cd frontEnd
npm install
npm run dev
```

The development storefront runs on:

```text
http://localhost:5173
```

---

## 🐳 Docker

MongoDB can be started using Docker Compose from the backend:

```bash
cd backEnd
docker compose up -d
```

Stop the containers with:

```bash
docker compose down
```

Product image storage is designed to use persistent Docker storage when the application is containerized.

---

## 🔄 Application Flow

```text
Customer
    ↓
KISUUFIM Storefront
    ↓
Browse Jewelry
    ↓
Product
    ↓
Cart
    ↓
Checkout
    ↓
Order
    ↓
Payment
    ↓
Order Processing
    ↓
Shipping
```

---

## 🗺️ Roadmap

Planned development includes:

- Product details page
- Shopping cart
- Persistent cart
- Customer checkout
- Online payment integration
- Stock reduction after successful payment
- Customer order history
- Order confirmation email
- Favorites / wishlist
- Admin dashboard
- Improved product management
- Backend Docker container
- Persistent production image storage
- Production deployment
- Cookie consent and privacy handling
- Responsive storefront improvements

---

## 🔒 Security

The application uses:

- JWT authentication
- Password hashing with bcrypt
- Role-based authorization
- Helmet security headers
- CORS configuration
- Environment variables for secrets
- Protected administrator routes

Production credentials and `.env` files should never be committed to Git.

---

## 👨‍💻 Developer

**Ronen Cohen**

Full Stack Developer

Portfolio:  
https://ronencohen.dev/

GitHub:  
https://github.com/RonenCohen7

---

## 📄 License

This project is developed as the **KISUUFIM handmade jewelry e-commerce platform**.

All rights reserved.