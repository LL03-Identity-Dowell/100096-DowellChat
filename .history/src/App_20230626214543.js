import "./App.css";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import {
  Routes,
  Router,
  redirect,
  Route,
  useSearchParams,
  Outlet,
} from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { AppProvider } from "./container/ContextProvider/DataContext";
// import ProtectedRoutes from "./container/protected/protectedRoutes";
import Home from "./container/home";
import { useEffect } from "react";
function App() {
  return (
    <div className="container-lg w-100 ">
      <AppProvider>
        <Routes>
          {/* <Route path="/dowell-chat-app" element={<Home />} /> */}

          <Route element={<ProtectedRoutes />}>
            <Route path="/dowell-chat-app" element={<Home />} />
          </Route>
        </Routes>
      </AppProvider>
    </div>
  );
}

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
    setSearchParams(currentParams);
  });
  // const { searchParams } = useContext(ProductContext);
  // const
  // let isAuth = { token: true };
  if (!searchParams)
    return (window.location = "https://100014.pythonanywhere.com/");

  return <Outlet />;
};
export default App;
