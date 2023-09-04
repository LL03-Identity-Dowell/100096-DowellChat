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
          path="/init/chat/:orgId/:product_name/:roomId/"
          element={<SecondRoute />}
        />
      </Route>
    </Routes>
  );
};

// https://ll03-identity-dowell.github.io/100096-DowellChat/#/init/chat/public/6385c0f18eca0fb652c94558/WORKFLOWAI/8nMWzB8eR5mD/?link_id=13265732473277059566
// https://ll03-identity-dowell.github.io/100096-DowellChat/#/init/chat/public/6385c0f18eca0fb652c94558/WORKFLOWAI/ZiQ7qUH73Q83/
// https://ll03-identity-dowell.github.io/100096-DowellChat/#/init/chat/6385c0f18eca0fb652c94558/USEREXPERIENCELIVE/8nMWzB8eR5mD/?public=true&link_id=7501844211236278766
