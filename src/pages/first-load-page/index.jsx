import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import DataContext from "../../context/data-context";
import { CustomerSupport } from "../customer-support";
import { LivingLabChat } from "../living-lab-chat";

export const FirstLoadComponent = () => {
  const { pageName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dataContext = React.useContext(DataContext);
  React.useEffect(() => {
    if (window.location.href.includes("?")) {
      const param = window.location.href.split("?")[1].split("=")[1];
      const collectedData = { sessionId: param };
      dataContext.setCollectedData(collectedData);
      navigate(`/${pageName}`, { replace: true });
    }
  }, [dataContext, navigate, pageName, searchParams, setSearchParams]);

  return pageName === "customer-support" ? (
    <CustomerSupport />
  ) : (
    pageName === "living-lab-chat" && <LivingLabChat />
  );
};
