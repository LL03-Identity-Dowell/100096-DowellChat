import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import DataContext from "../../context/data-context";
import { CustomerSupport } from "../customer-support";
import { LivingLabChat } from "../living-lab-chat";
import axios from "axios";

export const FirstLoadComponent = () => {
  const [message, setMessage] = useState("");
  const { pageName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dataContext = React.useContext(DataContext);

  const checkProduct = (productName) => {
    if (productName === "Dowell Customer Support Centre") {
      setMessage("You are eligible to proceed");
    } else {
      setMessage("You are not eligible to proceed");
    }
  };

  React.useEffect(() => {
    if (window.location.href.includes("?")) {
      const param = window.location.href.split("?")[1].split("=")[1];
      const collectedData = { sessionId: param };
      dataContext.setCollectedData(collectedData);
      const formData = new FormData();
      formData.append("session_id", collectedData.sessionId);
      if (window.location.pathname.includes("100096")) {
        console.log("here");
        axios
          .post("https://100093.pythonanywhere.com/api/userinfo/", formData)
          .then((response) => {
            console.log(response.data);
            // setMessage(response.data.msg);
            response.data.msg
              ? setMessage(response.data.msg)
              : checkProduct(response.data.portfolio_info[0].product);
          });
      } else {
        axios
          .post("https://100014.pythonanywhere.com/api/userinfo/", formData)
          .then((response) => {
            console.log(response.data);
            response.data.message
              ? setMessage(response.data.message)
              : checkProduct(response.data.portfolio_info[0].product);
          });
      }
      // navigate(`/${pageName}`, { replace: true });
    } else {
      setMessage("No session Id");
    }
  }, []);

  return (
    <div className="block justify-center items-center">
      <h1>{message}</h1>
    </div>
  );
  // pageName === "customer-support" ? (
  //   <CustomerSupport />
  // ) : (
  //   pageName === "living-lab-chat" && <LivingLabChat />
  // );
};
