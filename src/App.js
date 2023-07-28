import { CustomerSupport } from "./pages/customer-support";
import { Routes, Route } from "react-router-dom";
import { LivingLabChat } from "./pages/living-lab-chat";
export const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="living-lab-chat" element={<LivingLabChat />} />
        <Route path="customer-support" element={<CustomerSupport />} />
      </Route>
    </Routes>
  );
};
