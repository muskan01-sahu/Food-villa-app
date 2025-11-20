**Architecture**


This project is a React-based Single Page Application (SPA) using React Router for navigation and Redux Toolkit for global state management. It consumes the Swiggy API to display products, handle cart operations, and complete checkout. The app follows a component-driven architecture, with reusable UI components, page-level containers, and custom hooks for API calls. Product and cart data are cached in Redux to reduce redundant fetches, and Tailwind CSS ensures responsiveness across devices. Loading states, error handling, and form validation are implemented throughout to create a smooth and reliable user experience.


**Folder Structure**


src/

├── components/        # Reusable UI components        

├── utils/             # API helper functions

├── App.jsx            # Root component

├── Constants           #url


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


