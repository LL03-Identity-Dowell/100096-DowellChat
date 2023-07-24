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
<<<<<<< HEAD
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
=======
      <div className="container-lg w-100 ">
        <Toaster />
        <AppProvider>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/">
                <Route path="customer-support" element={<Home />} />
                <Route
                  path="living-lab-chat"
                  element={<CustomerSupportPage />}
                />
              </Route>
            </Route>
          </Routes>
        </AppProvider>
>>>>>>> 7c1593e3fca1b9f915feefacb05fa832c0feaf6f
      </div>
    </QueryClientProvider>
  );
}

export default App;
