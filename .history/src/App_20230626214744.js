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
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Home />} />
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
  };
  const params = Object.fromEntries([...searchParams]);
  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams(currentParams);
  });
  if (!searchParams)
    return (window.location = "https://100014.pythonanywhere.com/");

  return <Outlet />;
};
export default App;
