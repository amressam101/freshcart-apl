# 🛒 FreshCart - E-Commerce Web Application

A modern, feature-rich e-commerce platform built with **Angular 21**, offering a seamless shopping experience with product browsing, cart management, wishlist functionality, and secure checkout process.

---

## ✨ Key Features

### 🔐 Authentication & User Management

- **User Registration** - Create new account with email verification
- **Forgot Password** - Password recovery via email
- **Profile Management** - Update user information and preferences
- **Multiple Addresses** - Save and manage shipping addresses

### 🛍️ Shopping Experience

- **Product Catalog** - Browse extensive product collection
- **Category Filtering** - Filter products by categories
- **Brand Filtering** - Filter by product brands
- **Product Details** - Detailed product information with image gallery
- **Related Products** - Smart product recommendations

### 🛒 Cart & Wishlist

- **Shopping Cart** - Add, update, and remove items
- **Quantity Management** - Adjust product quantities easily
- **Price Calculation** - Real-time total with taxes and discounts
- **Wishlist** - Save favorite products for later
- **Cart Persistence** - Cart data saved across sessions

### 💳 Checkout & Orders

- **Secure Checkout** - Multi-step checkout process
- **Address Selection** - Choose from saved addresses
- **Order Summary** - Detailed order review before purchase
- **Order History** - View past orders and their status
- **Order Tracking** - Track order status and delivery

### 🎨 User Interface

- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Modern UI** - Clean and intuitive interface
- **SweetAlert Notifications** - Beautiful alert messages
- **Smooth Animations** - Enhanced user experience
- **Loading States** - Visual feedback during API calls

### 🔒 Security Features

- **Route Guards** - Protect authenticated routes
- **HTTP Interceptors** - Automatic token injection and error handling
- **Unauthorized Handling** - Automatic redirect on session expiry
- **Input Validation** - Client-side form validation

---

## 🛠️ Tech Stack

| Technology       | Version | Purpose                     |
| ---------------- | ------- | --------------------------- |
| **Angular**      | 21.2.1  | Frontend framework          |
| **TypeScript**   | 5.x     | Type-safe JavaScript        |
| **Tailwind CSS** | 3.x     | Utility-first CSS framework |
| **SweetAlert2**  | Latest  | Beautiful alert messages    |
| **Font Awesome** | 6.x     | Icon library                |
| **Flowbite**     | Latest  | Tailwind UI components      |
| **RxJS**         | 7.x     | Reactive programming        |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Angular CLI** - Install globally:
  ```bash
  npm install -g @angular/cli
  ```

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/amressam101/freshcart-apl.git
   cd freshcart-apl
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   ng serve
   ```

4. **Open your browser:**
   ```
   http://localhost:4200/
   ```

### Build for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── core/                     # Core module (singleton services)
│   │   ├── auth/                 # Authentication components
│   │   │   ├── login/            # Login page
│   │   │   ├── register/         # Registration page
│   │   │   └── forgot-password/  # Password recovery
│   │   ├── guards/               # Route protection guards
│   │   │   ├── auth.guard.ts     # Authenticated routes guard
│   │   │   └── no-auth.guard.ts  # Guest routes guard
│   │   ├── interceptors/         # HTTP interceptors
│   │   │   ├── header.interceptor.ts      # Add auth headers
│   │   │   ├── loading.interceptor.ts     # Loading state
│   │   │   └── unauthorized.interceptor.ts # Handle 401
│   │   ├── models/               # TypeScript interfaces
│   │   │   ├── product.model.ts
│   │   │   ├── cart.model.ts
│   │   │   ├── user.model.ts
│   │   │   └── order.model.ts
│   │   └── service/              # Core services
│   │       ├── auth.service.ts
│   │       ├── product.service.ts
│   │       ├── cart.service.ts
│   │       └── order.service.ts
│   │
│   ├── features/                 # Feature modules (lazy-loaded)
│   │   ├── home/                 # Home page with featured products
│   │   ├── products/             # Product listing page
│   │   ├── product-details/      # Single product view
│   │   ├── cart/                 # Shopping cart page
│   │   ├── checkout/             # Checkout process
│   │   ├── brands/               # Brands listing
│   │   ├── categories/           # Categories listing
│   │   ├── wishlist/             # Saved products
│   │   ├── orders/               # Order history
│   │   └── profile/              # User profile
│   │
│   ├── shared/                   # Shared module
│   │   ├── components/           # Reusable components
│   │   │   ├── navbar/           # Top navigation
│   │   │   ├── footer/           # Footer component
│   │   │   ├── product-card/     # Product card
│   │   │   ├── loader/           # Loading spinner
│   │   │   └── breadcrumb/       # Breadcrumb navigation
│   │   ├── directives/           # Custom directives
│   │   │   └── lazy-load.directive.ts
│   │   └── pipes/                # Custom pipes
│   │       ├── currency.pipe.ts
│   │       └── truncate.pipe.ts
│   │
│   ├── app.routes.ts             # Application routing
│   ├── app.config.ts             # App configuration
│   ├── app.component.ts          # Root component
│   └── app.component.html        # Root template
│
├── assets/                       # Static assets
│   ├── images/                   # Images
│   ├── icons/                    # Icons
│   └── fonts/                    # Custom fonts
│
├── environments/                 # Environment configurations
│   ├── environment.ts            # Development
│   └── environment.prod.ts       # Production
│
├── index.html                    # Main HTML file
├── main.ts                       # Application entry point
└── styles.css                    # Global styles
```

---

## 🏗️ Architecture & Design Patterns

### Core Architecture Principles

#### **1. Modular Design**

- **Core Module**: Contains singleton services, guards, and interceptors
- **Shared Module**: Reusable components, directives, and pipes
- **Feature Modules**: Lazy-loaded modules for better performance

#### **2. Lazy Loading**

- Feature modules are loaded on-demand
- Reduces initial bundle size
- Improves application load time

#### **3. Smart vs Presentational Components**

- **Smart Components** (Container): Handle business logic and data
- **Presentational Components**: Focus on UI rendering
- Clear separation of concerns

#### **4. Service Layer**

- Centralized API communication
- Business logic separation
- Reusable across components

### Security Implementation

#### **HTTP Interceptors**

```typescript
// Automatic token injection
HeaderInterceptor → Adds JWT token to all requests
LoadingInterceptor → Shows/hides loading spinner
UnauthorizedInterceptor → Redirects to login on 401
```

#### **Route Guards**

```typescript
AuthGuard → Protects authenticated routes
NoAuthGuard → Redirects logged-in users from login/register
```

#### **JWT Authentication**

- Secure token-based authentication
- Token stored in localStorage/sessionStorage
- Automatic token refresh (if implemented)

---

## 📡 API Integration

### Base URL

```
https://ecommerce.routemisr.com
```

### Authentication Endpoints

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| `POST` | `/auth/register`        | User registration         |
| `POST` | `/auth/login`           | User login                |
| `POST` | `/auth/forgot-password` | Password reset request    |
| `POST` | `/auth/reset-password`  | Reset password with token |
| `GET`  | `/auth/verify-email`    | Email verification        |

### Product Endpoints

| Method | Endpoint                 | Description              |
| ------ | ------------------------ | ------------------------ |
| `GET`  | `/products`              | Get all products         |
| `GET`  | `/products/:id`          | Get product details      |
| `GET`  | `/products/category/:id` | Get products by category |
| `GET`  | `/products/brand/:id`    | Get products by brand    |
| `GET`  | `/products/search?q=`    | Search products          |

### Cart Endpoints

| Method   | Endpoint    | Description               |
| -------- | ----------- | ------------------------- |
| `GET`    | `/cart`     | Get user cart             |
| `POST`   | `/cart`     | Add item to cart          |
| `PUT`    | `/cart/:id` | Update cart item quantity |
| `DELETE` | `/cart/:id` | Remove item from cart     |
| `DELETE` | `/cart`     | Clear entire cart         |

### Wishlist Endpoints

| Method   | Endpoint        | Description          |
| -------- | --------------- | -------------------- |
| `GET`    | `/wishlist`     | Get user wishlist    |
| `POST`   | `/wishlist`     | Add to wishlist      |
| `DELETE` | `/wishlist/:id` | Remove from wishlist |

### Order Endpoints

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| `POST` | `/orders`            | Create new order  |
| `GET`  | `/orders`            | Get user orders   |
| `GET`  | `/orders/:id`        | Get order details |
| `PUT`  | `/orders/:id/cancel` | Cancel order      |

### Category & Brand Endpoints

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| `GET`  | `/categories`     | Get all categories   |
| `GET`  | `/categories/:id` | Get category details |
| `GET`  | `/brands`         | Get all brands       |
| `GET`  | `/brands/:id`     | Get brand details    |

---

## 📸 Screenshots

> **Note:** Add actual screenshots of your application here

### Home Page

![Home Page](./screenshots/home.png)
_Featured products and categories showcase_

### Product Listing

![Products](./screenshots/products.png)
_Browse products with filters_

### Product Details

![Product Details](./screenshots/product-details.png)
_Detailed product information with image gallery_

### Shopping Cart

![Cart](./screenshots/cart.png)
_Manage cart items and quantities_

### Checkout

![Checkout](./screenshots/checkout.png)
_Secure checkout process_

### Wishlist

![Wishlist](./screenshots/wishlist.png)
_Saved favorite products_

### User Profile

![Profile](./screenshots/profile.png)
_Manage account and view orders_

---

## 🌐 Live Demo

🔗 **[View Live Application](https://freshcart-apl.netlify.app)**

---

## 👨‍💻 Developer

**Amr Essam**

- GitHub: [@amressam101](https://github.com/amressam101)

---
