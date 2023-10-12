import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../context/data-context";
import { CustomerSupport } from "../customer-support";
import { LivingLabChat } from "../living-lab-chat";
import axios from "axios";
import { RoomLoader } from "../../components/room-loader";
// import SecondRoute from "../secondRoute";

export const FirstLoadComponent = () => {
  const { pageName } = useParams();
  const navigate = useNavigate();
  const [customerSupportEligible, setCustomerSupportEligible] = useState(false);
  const [livingLabChatEligible, setLivingLabChatEligible] = useState(false);
  const dataContext = React.useContext(DataContext);

  function checkstatus() {
    // var lav = document.getElementById("useronline-status-icons");
    // axios
    //   .get("https://100014.pythonanywhere.com/en/live_status")
    //   .then((response) => {
    //     console.log(response.data);
    //   });
    // AJAX GET request
    // $.ajax({
    //   url: 'https://100014.pythonanywhere.com/en/live_status',
    //   type: 'GET',
    //   success: function(data) {
    //     lav.style.color="green"
    //   //   lav.innerHTML = JSON.stringify(data);
    //   },
    //   error: function(error) {
    //   //   console.error(error);
    //    lav.style.color="red"
    //   }
    // });
    // AJAX POST request
    // $.ajax({
    //   url: 'https://100014.pythonanywhere.com/en/live_status',
    //   type: 'POST',
    //   data: JSON.stringify({ session_id:"f5u2udocbu8e3mg12hw9tb1h0h5wzcbe",product: "Living Lab Admin"}),
    //   contentType: 'application/json',
    //   success: function(data) {
    //     console.log(data);
    //   },
    //   error: function(error) {
    //     console.error(error);
    //   }
    // });
  }
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

    if (id === "100014") {
      axios
        .post("https://100014.pythonanywhere.com/api/userinfo/", {
          session_id: sessionId,
        })
        .then((response) => {
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
                userportfolio: response.data.selected_product.userportfolio,
              };
              dataContext.setCollectedData(collectedData);
            }
          } else {
            window.location.href = "https://100014.pythonanywhere.com/en/";
          }
        });
    } else {
      axios
        .post("https://100093.pythonanywhere.com/api/userinfo/", {
          session_id: sessionId,
        })
        .then((response) => {
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
                userportfolio: response.data.selected_product.userportfolio,
              };
              dataContext.setCollectedData(collectedData);

              // [
              //   {
              //     username: ["manish_test_error_login"],
              //     member_type: "owner",
              //     product: "Living Lab Chat",
              //     data_type: "Testing_Data",
              //     operations_right: "Admin",
              //     role: "Maanish owner",
              //     security_layer: "None",
              //     portfolio_name: "Manish_test_chat",
              //     portfolio_code: "cyueryc7358475",
              //     portfolio_specification: "",
              //     portfolio_uni_code: "",
              //     portfolio_details: "",
              //     status: "enable",
              //     org_id: "6385c0f18eca0fb652c94558", // workspace id
              //     owner_name: "manish_test_error_login",
              //     org_name: "manish_test_error_login",
              //   },
              //   {
              //     username: [
              //       "8nMWzB8eR5mD",
              //       "ZiQ7qUH73Q83",
              //       "g6tWCp5trVRO",
              //       "LtpGqLxzy54d",
              //       "Gr4t0YhpMfVa", // display grouped
              //     ],
              //     member_type: "public", // if public
              //     product: "Living Lab Chat",
              //     data_type: "Testing_Data",
              //     operations_right: "Add/Edit",
              //     role: "Programmer",
              //     security_layer: "None",
              //     portfolio_name: "chat_test_1_3f4534",
              //     portfolio_code: "chat_test_1", // check
              //     portfolio_specification: "",
              //     portfolio_uni_code: "",
              //     portfolio_details: "",
              //     status: "enable",
              //   },
              //   {
              //     username: ["manish_test_error_login"],
              //     member_type: "owner",
              //     product: "Living Lab Chat",
              //     data_type: "Real_Data",
              //     operations_right: "Admin",
              //     role: "Maanish owner",
              //     security_layer: "None",
              //     portfolio_name: "CHATOWNER",
              //     portfolio_code: "dasd123124",
              //     portfolio_specification: "",
              //     portfolio_uni_code: "",
              //     portfolio_details: "",
              //     status: "enable",
              //   },
              //   {
              //     username: ["ZiQ7qUH73Q83"],
              //     member_type: "public",
              //     product: "Living Lab Chat",
              //     data_type: "Real_Data",
              //     operations_right: "Add/Edit",
              //     role: "Programmer",
              //     security_layer: "None",
              //     portfolio_name: "TESTPUBLIC",
              //     portfolio_code: "PUB100001",
              //     portfolio_specification: "",
              //     portfolio_uni_code: "",
              //     portfolio_details: "",
              //     status: "enable",
              //   },
              //   {
              //     username: ["20lNEGhtIY0O", "rjNHeSIPl8j9"],
              //     member_type: "public",
              //     product: "Living Lab Chat",
              //     data_type: "Real_Data",
              //     operations_right: "Add/Edit",
              //     role: "Programmer",
              //     security_layer: "None",
              //     portfolio_name: "NEWPUBLICLINK",
              //     portfolio_code: "PUB101LINK",
              //     portfolio_specification: "",
              //     portfolio_uni_code: "",
              //     portfolio_details: "",
              //     status: "enable",
              //   },
              //   {
              //     username: [
              //       "E37l1lMsbsJK",
              //       "uSGUUNoxhzEX",
              //       "20lNEGhtIY0O",
              //       "rjNHeSIPl8j9",
              //     ],
              //     member_type: "public",
              //     product: "Living Lab Chat",
              //     data_type: "Real_Data",
              //     operations_right: "Admin",
              //     role: "Programmer",
              //     security_layer: "None",
              //     portfolio_name: "Manish_test_chat786876",
              //     portfolio_code: "test_chat7868868",
              //     portfolio_specification: "",
              //     portfolio_uni_code: "",
              //     portfolio_details: "",
              //     status: "enable",
              //   },
              // ],
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
          checkstatus();
        } else {
          window.location.href = "https://100014.pythonanywhere.com/en/";
        }
      } else {
        const session_id = sessionStorage.getItem("sessionId");
        const id = sessionStorage.getItem("id");
        if (session_id) {
          getUserData(session_id, id);
          checkstatus();
        } else {
          window.location.href = "https://100014.pythonanywhere.com/en/";
        }
        // session_id
        //   ? getUserData(session_id, id)
        //   : (window.location.href = "https://100014.pythonanywhere.com/en/");
      }
    } else {
      window.location.href = "https://100014.pythonanywhere.com/en/";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageName, navigate]);

  return customerSupportEligible ? (
    <CustomerSupport />
  ) : livingLabChatEligible ? (
    <LivingLabChat />
  ) : (
    <main>
      <svg
        class="ip"
        viewBox="0 0 256 128"
        width="256px"
        height="128px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#5ebd3e" />
            <stop offset="33%" stop-color="#ffb900" />
            <stop offset="67%" stop-color="#f78200" />
            <stop offset="100%" stop-color="#e23838" />
          </linearGradient>
          <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stop-color="#e23838" />
            <stop offset="33%" stop-color="#973999" />
            <stop offset="67%" stop-color="#009cdf" />
            <stop offset="100%" stop-color="#5ebd3e" />
          </linearGradient>
        </defs>
        <g fill="none" stroke-linecap="round" stroke-width="16">
          <g class="ip__track" stroke="#ddd">
            <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
            <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
          </g>
          <g stroke-dasharray="180 656">
            <path
              class="ip__worm1"
              stroke="url(#grad1)"
              stroke-dashoffset="0"
              d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
            />
            <path
              class="ip__worm2"
              stroke="url(#grad2)"
              stroke-dashoffset="358"
              d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
            />
          </g>
        </g>
      </svg>
    </main>
  );
};
