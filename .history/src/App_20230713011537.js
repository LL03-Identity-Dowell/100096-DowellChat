import "./App.css";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import {
  Routes,
  Router,
  redirect,
  Route,
  useSearchParams,
} from "react-router-dom";
import { useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-tooltip/dist/react-tooltip.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { AppProvider } from "./container/ContextProvider/DataContext";
import ProtectedRoutes from "./container/protected/protectedRoutes";
import ProductContext from "./container/ContextProvider/DataContext";
import { Toaster } from "react-hot-toast";
import Home from "./container/home";
import { useEffect } from "react";
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
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </AppProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
