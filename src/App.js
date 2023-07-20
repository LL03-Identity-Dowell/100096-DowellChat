import "./App.css";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import { Toaster } from "react-hot-toast";
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
import { useEffect } from "react";
import CustomerSupportPage from "./container/customerSupportPage";
function App() {
  const queryClient = new QueryClient();
  // function handleSubmit(e) {
  //   e.preventDefault();

  //   let params = serializeFormQuery(e.target);
  //   setSearchParams(params);
  // }
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container-lg w-100 ">
        <Toaster />
        <AppProvider>
          <Routes>
            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="/customer-support" element={<Home />} />
              <Route
                path="/living-lab-chat"
                element={<CustomerSupportPage />}
              />
            </Route>
          </Routes>
        </AppProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
