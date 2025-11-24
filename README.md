# 🍽️ Food Villa App


This project is a React-based Single Page Application (SPA) using React Router for navigation and Redux Toolkit for global state management. It consumes the Swiggy API to display products, handle cart operations, and complete checkout. The app follows a component-driven architecture, with reusable UI components, page-level containers, and custom hooks for API calls. Product and cart data are cached in Redux to reduce redundant fetches, and Tailwind CSS ensures responsiveness across devices. Loading states, error handling, and form validation are implemented throughout to create a smooth and reliable user experience.


This README provides **clear, step-by-step instructions** to install dependencies and run the project locally.

---

## 📦 Prerequisites

Before installing the project, ensure you have:

* **Node.js** (v16 or higher)
* **npm** (comes with Node)

Check versions:

```bash
node -v
npm -v
```

---

## 🚀 Getting Started (Local Setup)

Follow these steps to run the application on your local machine.

---

### ✅ 1. Clone the Repository

```bash
git clone https://github.com/muskan01-sahu/Food-villa-app.git
```

Navigate into the project folder:

```bash
cd Food-villa-app
```

---

### ✅ 2. Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

This installs everything from `package.json`.

---

### ✅ 3. Start the Development Server

Use:

```bash
npm start
```

Parcel will:

* Bundle the project
* Start a development server
* Enable hot reloading (HMR)

Your application will be available at:

```
http://localhost:1234/
```

(If port 1234 is busy, Parcel will select another port.)

---

## 🔧 Build for Production

To generate an optimized build in the `dist/` folder:

```bash
npm run build
```

---

## ❗ Troubleshooting

### ❌ Parcel not found

Run:

```bash
npm install -g parcel
```

Or use npx:

```bash
npx parcel src/index.html
```

### ❌ API not loading

Public restaurant API endpoints may change. If needed:

* Update API URL inside your utils/config file.
* Use mock data as fallback.

---

## 📁 Project Structure

```
Food-villa-app/
│
├── src/
│   ├── components/
│   ├── utils/
│   ├── assets/
│   └── ...
├── package.json
├── index.html
└── README.md
```

---

## 🤝 Contributing

Feel free to open issues or contribute improvements.

---

## 📝 License

This project is open-source and free to use.



**Routing**

Route  	      Component/Page	      Description

#/	      Home.jsx    	Product listing with filters

#/product/:id	ProductDetail.jsx	Single product details & add to cart

#/cart	Cart.jsx	Shopping cart, update quantity, remove items

#/checkout	CheckoutPage.jsx	Checkout form and order summary

#/placeorder	PlaceOrder.jsx	Order confirmation page

**State Management**

**Component Responsibilities**

**API & Data Flow**

**Responsive Design**

**Design Decisions & Trade-Offs**

**Redux Use**

**Tailwind CSS**

**React**

---

## 📦 Prerequisites

Before installing the project, ensure you have:

* **Node.js** (v16 or higher)
* **npm** (comes with Node)

Check versions:

```bash
node -v
npm -v
```

---

## 🚀 Getting Started (Local Setup)

Follow these steps to run the application on your local machine.

---

### ✅ 1. Clone the Repository

```bash
git clone https://github.com/muskan01-sahu/Food-villa-app.git
```

Navigate into the project folder:

```bash
cd Food-villa-app
```

---

### ✅ 2. Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

This installs everything from `package.json`.

---

### ✅ 3. Start the Development Server

Use:

```bash
npm start
```

Parcel will:

* Bundle the project
* Start a development server
* Enable hot reloading (HMR)

Your application will be available at:

```
http://localhost:1234/
```

(If port 1234 is busy, Parcel will select another port.)

---

## 🔧 Build for Production

To generate an optimized build in the `dist/` folder:

```bash
npm run build
```

---

## ❗ Troubleshooting

### ❌ Parcel not found

Run:

```bash
npm install -g parcel
```

Or use npx:

```bash
npx parcel src/index.html
```

### ❌ API not loading

Public restaurant API endpoints may change. If needed:

* Update API URL inside your utils/config file.
* Use mock data as fallback.

---

## 📁 Project Structure

```
Food-villa-app/
│
├── src/
│   ├── components/
│   ├── utils/
│   ├── assets/
│   └── ...
├── package.json
├── index.html
└── README.md
```

---

## 🤝 Contributing

Feel free to open issues or contribute improvements.

---

## 📝 License

This project is open-source and free to use.

