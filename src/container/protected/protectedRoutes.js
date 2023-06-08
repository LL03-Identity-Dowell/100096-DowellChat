import { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import ProductContext from "../ContextProvider/DataContext";
// const useAuth = () => {
//   const user = { loggedIn: localStorage.getItem("tokenId") };
//   const user = { token: false };
//   return user;
// };

const ProtectedRoutes = () => {
  const { sessionId } = useContext(ProductContext);
  // const
  let isAuth = { token: true };
  if (!isAuth.token)
    return (window.location = "https://100014.pythonanywhere.com/");

  return <Outlet />;
};

export default ProtectedRoutes;
