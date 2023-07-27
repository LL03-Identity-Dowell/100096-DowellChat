import "./App.css";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import { LoaderIcon, Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  Routes,
  Router,
  redirect,
  Route,
  useSearchParams,
} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-tooltip/dist/react-tooltip.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { AppProvider } from "./container/ContextProvider/DataContext";
import ProtectedRoutes from "./container/protected/protectedRoutes";
import Home from "./container/home";
import { useEffect, useState } from "react";
import CustomerSupportPage from "./container/customerSupportPage";
import { CustomLoader } from "./container/spinner/CustomLoader";
function App() {
  const queryClient = new QueryClient();
  const [loading, setLoading] = useState(false);
  // function handleSubmit(e) {
  //   e.preventDefault();

  //   let params = serializeFormQuery(e.target);
  //   setSearchParams(params);
  // }
  useEffect(() => {
    setPageLoad();
  }, []);
  const setPageLoad = () => {
    setLoading(true);
    // setLoading(true);
    console.log("hello");
    setTimeout(() => setLoading(false), 10000);
    // setLoading(false);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <div className="d-flex justify-content-center align-items-center">
        <div className="d-flex align-items-center ">
          {loading ? (
            <CustomLoader />
          ) : (
            <div className="container-lg w-100 ">
              <Toaster />
              <AppProvider>
                <Routes>
                  <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<Home />} />
                    <Route
                      path="customerSupport"
                      element={<CustomerSupportPage />}
                    />
                  </Route>
                </Routes>
              </AppProvider>
            </div>
          )}
        </div>
        <span className="hidden">a840b047ce66c46ef4dfd367158f7ccd8a3d8311</span>
      </div>
    </QueryClientProvider>
  );
}

export default App;
