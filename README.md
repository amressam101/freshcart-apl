# E-Commerce Web App

A modern and responsive e-commerce web application built using Angular. The application allows users to browse products, manage their shopping cart, and complete orders with a smooth and dynamic user experience.

---

## 🚀 Features

- User Authentication (Login / Register / Forgot Password)
- Route protection using Angular Guards to prevent unauthorized access
- HTTP request handling using Interceptors
- Integration with RESTful APIs
- Add, update, and remove items from Cart & Wishlist
- Product filtering by category and brand
- Manage user addresses and view orders
- Responsive UI with modern design
- Alert messages using SweetAlert

---

## 🛠️ Tech Stack

- Angular version(21.2.1)
- TypeScript
- Tailwind CSS
- SweetAlert2
- Font Awesome
- Flowbite

---

## ⚙️ Installation

1. Clone the repository:

```bash
git clone https://github.com/amressam101/freshcart-apl.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the project:

```bash
ng serve
```

4. Open your browser at:

```bash
http://localhost:4200/
```

## 📂 Folder Structure

```bash
src/
├── app/
│   ├── core/
│   │   ├── auth/              # authentication (login, register, forgot password)
│   │   ├── guards/            # route protection
│   │   ├── interceptors/      # HTTP interceptors (headers, loading, unauthorized)
│   │   ├── models/            # data models
│   │   └── service/           # API services
│
│   ├── features/              # main application pages
│   │   ├── home/
│   │   ├── products/
│   │   ├── product-details/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── brands/
│   │   ├── categories/
│   │   ├── wishlist/
│   │   └── ...
│
│   ├── shared/
│   │   ├── components/        # reusable UI components
│   │   ├── directives/        # custom directives
│   │   └── pipes/             # custom pipes
│
│   ├── environments/          # environment configs
│   ├── app.routes.ts
│   ├── app.config.ts
│   └── app.component.ts
│
├── assets/                    # static files (images, fonts)
├── index.html
└── styles.css
```

## 🧠 Architecture & Advanced Concepts :

- Implemented route protection using Angular Guards
- Used HTTP Interceptors for handling requests and global error handling
- Applied modular architecture using Core, Shared, and Feature modules
- Separation of concerns for better scalability and maintainability

## 🌐 Live Demo :

👉 https://freshcart-apl.netlify.app
