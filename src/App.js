import { Routes, Route } from "react-router-dom";
import { FirstLoadComponent } from "./pages/first-load-page";

export const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route exect path="/:pageName" element={<FirstLoadComponent />}></Route>
      </Route>
    </Routes>
  );
};
