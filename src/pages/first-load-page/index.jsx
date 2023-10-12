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
    <div className="">
      <div
        role="status"
        className="flex flex-col min-h-screen min-w-max items-center justify-center text-center"
      >
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span>Loading...</span>
      </div>
    </div>
  );
};
