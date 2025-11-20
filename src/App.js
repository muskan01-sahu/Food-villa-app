import React, { lazy, Suspense, useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./components/Error";
import Shimmer from "./components/Shimmer";
import { Provider } from "react-redux";
import store, { persistor } from "./utils/store";
import { PersistGate } from "redux-persist/integration/react";
import ProtectedRoute from "./utils/ProtectedRoute";

const Body = lazy(() => import("./components/Body"));
const Home = lazy(() => import("./components/Home"));
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"));
const Cart = lazy(() => import("./components/Cart"));
const CheckOutPage = lazy(() => import("./components/CheckOutPage"));
const PlaceOrderPage = lazy(() => import("./components/PlaceOrderPage"));
const LoginPage = lazy(() => import("./components/LoginPage"));

const AppLayout = () => {
  const [hideChrome, setHideChrome] = useState(false);

  useEffect(() => {
    const updateChromeVisibility = () => {
      if (typeof window === "undefined") return;
      const hashPath = window.location.hash.replace("#", "");
      setHideChrome(hashPath === "/login");
    };

    updateChromeVisibility();
    window.addEventListener("hashchange", updateChromeVisibility);

    return () => {
      window.removeEventListener("hashchange", updateChromeVisibility);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<Shimmer />} persistor={persistor}>
        {!hideChrome && <Header />}
        <Suspense fallback={<Shimmer />}>
          <Outlet />
        </Suspense>
        {!hideChrome && <Footer />}
      </PersistGate>
    </Provider>
  );
};
   
const appRouter = createHashRouter([
    {
        path:"/",
        element:<AppLayout/>,
        errorElement:<Error/>,
        children:[
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path:"/",
                element: (
                    <ProtectedRoute>
                      <Body />
                    </ProtectedRoute>
                ),
            },
            {
                path:"/home",
                element:(
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                ),
            },

            {
                path:"/restaurant/:resId",
                element:(
                    <ProtectedRoute>
                        <RestaurantMenu />
                    </ProtectedRoute>  
                ),
            },
            {
                path:"/cart",
                element: (
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                ),
            },
            {
                path:"/checkout",
                element: (
                    <ProtectedRoute>
                      <CheckOutPage />
                    </ProtectedRoute>
                ),
            },
            {
                path:"/placeorder",
                element: (
                    <ProtectedRoute>
                      <PlaceOrderPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);     
        
const App = () => {
    return <RouterProvider router={appRouter}/>;
}

export default App;


