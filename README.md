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
or
npm run start
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
├── .babelrc
├── .gitignore
├── .postcssrc
├── README.md
├── index.css
├── index.html
├── index.js
├── jest.config.js
├── package-lock.json
├── package.json
├── tailwind.config.js
│
├── src/
│   ├── App.js
│   ├── Constants.js
│   │
│   ├── __tests__/               # Jest test files
│   │
│   ├── components/
│   │   ├── Body.js
│   │   ├── Cart.js
│   │   ├── CheckOutPage.js
│   │   ├── Contact.js
│   │   ├── Error.js
│   │   ├── FoodItem.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── Home.js
│   │   ├── LoginPage.js
│   │   ├── PlaceOrderPage.js
│   │   ├── RestaurantCard.js
│   │   ├── RestaurantMenu.js
│   │   ├── Shimmer.js
│   │
│   ├── utils/
│       ├── ProtectedRoute.js
│       ├── SearchContext.js
│       ├── UserContext.js
│       ├── cartSlice.js
│       ├── checkoutSlice.js
│       ├── helper.js
│       ├── store.js
│       ├── useCart.js
│       ├── useCategoryFilter.js
│       ├── useCheckoutForm.js
│       ├── useLogin.js
│       ├── useRestaurant.js
│       ├── useSearch.js
```
---

# 📌 **Component Descriptions**

### components/



| File                  | Purpose                                                  |
| --------------------- | -------------------------------------------------------- |
| **Body.js**           | Main layout for home page containing restaurant listing. |
| **Cart.js**           | Displays all cart items using Redux cartSlice.           |
| **CheckOutPage.js**   | Collects user details & order summary for checkout.      |
| **Contact.js**        | Contact information page.                                |
| **Error.js**          | Error boundary / fallback UI.                            |
| **FoodItem.js**       | Renders single food item inside restaurant menu.         |
| **Footer.js**         | Page footer layout.                                      |
| **Header.js**         | Navbar containing logo, login, cart count, etc.          |
| **Home.js**           | Home listing with category filters & search.             |
| **LoginPage.js**      | Login form using useLogin hook + userContext.            |
| **PlaceOrderPage.js** | Final order placement page.                              |
| **RestaurantCard.js** | Card UI for each restaurant.                             |
| **RestaurantMenu.js** | Restaurant details + menu items + category filters.      |
| **Shimmer.js**        | Skeleton loader while fetching data.                     |



---

# 📌 **utils/ Files Description**

### /utils



| File                     | Purpose                                             |
| ------------------------ | --------------------------------------------------- |
| **ProtectedRoute.js**    | Restricts routes for authenticated users only.      |
| **SearchContext.js**     | Global search state using React Context.            |
| **UserContext.js**       | Stores logged-in user data globally.                |
| **cartSlice.js**         | Redux slice for managing cart operations.           |
| **checkoutSlice.js**     | Redux slice for checkout form + order flow.         |
| **helper.js**            | Utility functions (formatting, calculations, etc.). |
| **store.js**             | Redux store configuration.                          |
| **useCart.js**           | Custom hook for cart logic.                         |
| **useCategoryFilter.js** | Filtering categories in restaurant menu.            |
| **useCheckoutForm.js**   | Checkout form state handler.                        |
| **useLogin.js**          | Form handling + authentication logic.               |
| **useRestaurant.js**     | Fetch & manage restaurant details.                  |
| **useSearch.js**         | Search logic hook used in Home.js.                  |



---

# 🛠️ **Available Scripts**

| Command         | Description              |
| --------------- | ------------------------ |
| `npm start`     | Runs development server  |
| `npm test`      | Runs Jest test cases     |
| `npm run build` | Creates production build |

---


## 🤝 Contributing

Feel free to open issues or contribute improvements.

---

## 📝 License

This project is open-source and free to use.









