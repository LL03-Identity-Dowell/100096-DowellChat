import { Routes, Route } from "react-router-dom";
import { FirstLoadComponent } from "./pages/first-load-page";
import SecondRoute from "./pages/secondRoute";

export const App = (workspace_id, event, qr_id) => {
  return (
    <Routes>
      <Route path="/">
        <Route exect path="/:pageName" element={<FirstLoadComponent />}></Route>
        <Route
          exect
          path="/init/chat/public/:orgId/:productName/:roomId/"
          element={<SecondRoute />}
        />
      </Route>
    </Routes>
  );
};
