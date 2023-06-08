import "./App.css";
import { Tooltip } from "react-tooltip";
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
function App() {
  let [searchParams, setSearchParams] = useSearchParams();
  // let [searchParams] = useSearchParams();
  console.log(searchParams);
  // const date = new Date();
  // console.log("date", date);
  // for (const entry of searchParams.entries()) {
  //   const [param, value] = entry;
  // }
  // console.log([...searchParams]);
  const params = Object.fromEntries([...searchParams]);
  console.log("mounted", params);
  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    console.log(currentParams);
    setSearchParams({ sort: "name", order: "ascending" });
  }, [searchParams]);
  // function handleSubmit(e) {
  //   e.preventDefault();

  //   let params = serializeFormQuery(e.target);
  //   setSearchParams(params);
  // }
  return (
    <div className="container-lg w-100 ">
      <AppProvider>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dowell-chat-app" element={<Home />} />
          </Route>
        </Routes>
      </AppProvider>
    </div>
  );
}

export default App;
