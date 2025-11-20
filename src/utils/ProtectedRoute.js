import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isBrowser = typeof window !== "undefined";
  const isLoggedIn =
    isBrowser && window.localStorage.getItem("isLoggedIn") === "true";

  if (!isBrowser) {
    return null;
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
