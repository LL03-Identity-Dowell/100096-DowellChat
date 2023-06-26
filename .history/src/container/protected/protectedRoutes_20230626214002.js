import { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import ProductContext from "../ContextProvider/DataContext";
// const useAuth = () => {
//   const user = { loggedIn: localStorage.getItem("tokenId") };
//   const user = { token: false };
//   return user;
// };

const ProtectedRoutes = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const sessionId = {
    session_id: "4sjl7vrpycwauvueewhqrme0u5vqnnmj",
    // session_id: "5p8do0ht7no4gyjo0w2984o4vj5dc2hs",
  };
  // const cachedSessionId = useMemo(() => sessionId, [sessionId]);
  const params = Object.fromEntries([...searchParams]);
  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    // console.log(currentParams);
    setSearchParams(sessionId);
  });
  // const { searchParams } = useContext(ProductContext);
  // const
  // let isAuth = { token: true };
  if (!searchParams)
    return (window.location = "https://100014.pythonanywhere.com/");

  return <Outlet />;
};

export default ProtectedRoutes;
