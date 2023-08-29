import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../context/data-context";
import { CustomerSupport } from "../customer-support";
import { LivingLabChat } from "../living-lab-chat";
import axios from "axios";

export const FirstLoadComponent = () => {
  const { pageName } = useParams();
  const navigate = useNavigate();
  const [customerSupportEligible, setCustomerSupportEligible] = useState(false);
  const [livingLabChatEligible, setLivingLabChatEligible] = useState(false);
  const dataContext = React.useContext(DataContext);

  const checkProduct = (portfolio_info) => {
    for (let i = 0; i < portfolio_info.length; i++) {
      if (
        portfolio_info[i].product === "Dowell Customer Support Centre" &&
        pageName === "customer-support"
      ) {
        navigate(`/${pageName}`, { replace: true });
        setCustomerSupportEligible(true);
        setLivingLabChatEligible(false);
        return true;
      } else if (
        portfolio_info[i].product === "Living Lab Chat" &&
        pageName === "living-lab-chat"
      ) {
        navigate(`/${pageName}`, { replace: true });
        setLivingLabChatEligible(true);
        setCustomerSupportEligible(false);
        return true;
      }
    }
    setCustomerSupportEligible(false);
    setLivingLabChatEligible(false);
    window.location.href = "https://100014.pythonanywhere.com/en/";
  };

  const getUserData = (sessionId, id) => {
    const collectedData = { sessionId: sessionId, id: id };
    dataContext.setCollectedData(collectedData);

    if (id === "100093") {
      axios
        .post("https://100093.pythonanywhere.com/api/userinfo/", {
          session_id: sessionId,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.portfolio_info) {
            if (checkProduct(response.data.portfolio_info)) {
              const collectedData = {
                userName: response.data.userinfo.username,
                sessionId: sessionId,
                id: id,
                email: response.data.userinfo.email,
                profileImage: response.data.userinfo.profile_img,
                orgId: response.data.userinfo.client_admin_id,
                userId: response.data.userinfo.userID,
                phone: response.data.userinfo.phone,
                userCountry: response.data.userinfo.user_country,
                userportfolio: response.data.userportfolio,
              };
              dataContext.setCollectedData(collectedData);
            }
          } else {
            window.location.href = "https://100014.pythonanywhere.com/en/";
          }
        });
    } else {
      axios
        .post("https://100014.pythonanywhere.com/api/userinfo/", {
          session_id: sessionId,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.portfolio_info) {
            if (checkProduct(response.data.portfolio_info)) {
              const collectedData = {
                userName: response.data.userinfo.username,
                sessionId: sessionId,
                id: id,
                email: response.data.userinfo.email,
                profileImage: response.data.userinfo.profile_img,
                orgId: response.data.userinfo.client_admin_id,
                userId: response.data.userinfo.userID,
                phone: response.data.userinfo.phone,
                userCountry: response.data.userinfo.user_country,
                timezone: response.data.userinfo.timezone,
                userportfolio: [
                  {
                    username: ["manish_test_error_login"],
                    member_type: "owner",
                    product: "Living Lab Chat",
                    data_type: "Testing_Data",
                    operations_right: "Admin",
                    role: "Maanish owner",
                    security_layer: "None",
                    portfolio_name: "Manish_test_chat",
                    portfolio_code: "cyueryc7358475",
                    portfolio_specification: "",
                    portfolio_uni_code: "",
                    portfolio_details: "",
                    status: "enable",
                    org_id: "6385c0f18eca0fb652c94558", // workspace id
                    owner_name: "manish_test_error_login",
                    org_name: "manish_test_error_login",
                  },
                  {
                    username: [
                      "8nMWzB8eR5mD",
                      "ZiQ7qUH73Q83",
                      "g6tWCp5trVRO",
                      "LtpGqLxzy54d",
                      "Gr4t0YhpMfVa", // display grouped
                    ],
                    member_type: "public", // if public
                    product: "Living Lab Chat",
                    data_type: "Testing_Data",
                    operations_right: "Add/Edit",
                    role: "Programmer",
                    security_layer: "None",
                    portfolio_name: "chat_test_1_3f4534",
                    portfolio_code: "chat_test_1", // check
                    portfolio_specification: "",
                    portfolio_uni_code: "",
                    portfolio_details: "",
                    status: "enable",
                  },
                  {
                    username: ["manish_test_error_login"],
                    member_type: "owner",
                    product: "Living Lab Chat",
                    data_type: "Real_Data",
                    operations_right: "Admin",
                    role: "Maanish owner",
                    security_layer: "None",
                    portfolio_name: "CHATOWNER",
                    portfolio_code: "dasd123124",
                    portfolio_specification: "",
                    portfolio_uni_code: "",
                    portfolio_details: "",
                    status: "enable",
                  },
                  {
                    username: ["ZiQ7qUH73Q83"],
                    member_type: "public",
                    product: "Living Lab Chat",
                    data_type: "Real_Data",
                    operations_right: "Add/Edit",
                    role: "Programmer",
                    security_layer: "None",
                    portfolio_name: "TESTPUBLIC",
                    portfolio_code: "PUB100001",
                    portfolio_specification: "",
                    portfolio_uni_code: "",
                    portfolio_details: "",
                    status: "enable",
                  },
                  {
                    username: ["20lNEGhtIY0O", "rjNHeSIPl8j9"],
                    member_type: "public",
                    product: "Living Lab Chat",
                    data_type: "Real_Data",
                    operations_right: "Add/Edit",
                    role: "Programmer",
                    security_layer: "None",
                    portfolio_name: "NEWPUBLICLINK",
                    portfolio_code: "PUB101LINK",
                    portfolio_specification: "",
                    portfolio_uni_code: "",
                    portfolio_details: "",
                    status: "enable",
                  },
                  {
                    username: [
                      "E37l1lMsbsJK",
                      "uSGUUNoxhzEX",
                      "20lNEGhtIY0O",
                      "rjNHeSIPl8j9",
                    ],
                    member_type: "public",
                    product: "Living Lab Chat",
                    data_type: "Real_Data",
                    operations_right: "Admin",
                    role: "Programmer",
                    security_layer: "None",
                    portfolio_name: "Manish_test_chat786876",
                    portfolio_code: "test_chat7868868",
                    portfolio_specification: "",
                    portfolio_uni_code: "",
                    portfolio_details: "",
                    status: "enable",
                  },
                ],
              };
              dataContext.setCollectedData(collectedData);
            }
          } else {
            window.location.href = "https://100014.pythonanywhere.com/en/";
          }
        });
    }
  };
  useEffect(() => {
    // Create a URL object
    const url = window.location.href;
    // Split the URL by the hash character
    const parts = url.split("#");

    // Check if there are parts after the hash
    if (parts.length > 1) {
      const hashPart = parts[1];

      if (hashPart.includes("?")) {
        // Split the hash part by the question mark character
        const hashParams = hashPart.split("?")[1];

        // Split the hash parameters by the ampersand character
        const paramPairs = hashParams.split("&");

        const parameters = {};
        paramPairs.forEach((paramPair) => {
          if (paramPair.includes("=")) {
            const [key, value] = paramPair.split("=");
            parameters[key] = value;
          }
        });

        const sessionId = parameters["session_id"];
        const id = parameters["id"];

        if (sessionId) {
          getUserData(sessionId, id);
        } else {
          window.location.href = "https://100014.pythonanywhere.com/en/";
        }
      } else {
        const session_id = sessionStorage.getItem("sessionId");
        const id = sessionStorage.getItem("id");
        session_id
          ? getUserData(session_id, id)
          : (window.location.href = "https://100014.pythonanywhere.com/en/");
      }
    } else {
      window.location.href = "https://100014.pythonanywhere.com/en/";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageName, navigate]);

  return customerSupportEligible ? (
    <CustomerSupport />
  ) : (
    livingLabChatEligible && <LivingLabChat />
  );
};
