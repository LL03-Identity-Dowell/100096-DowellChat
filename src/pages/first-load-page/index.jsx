import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../context/data-context";
import { CustomerSupport } from "../customer-support";
import { LivingLabChat } from "../living-lab-chat";
import axios from "axios";
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
            window.location.href = "https://100014.pythonanywhere.com/";
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
            }
          } else {
            window.location.href = "https://100014.pythonanywhere.com/";
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
          window.location.href = "https://100014.pythonanywhere.com/";
        }
      } else {
        const session_id = sessionStorage.getItem("sessionId");
        const id = sessionStorage.getItem("id");
        if (session_id) {
          getUserData(session_id, id);
          checkstatus();
        } else {
          window.location.href = "https://100014.pythonanywhere.com/";
        }
        // session_id
        //   ? getUserData(session_id, id)
        //   : (window.location.href = "https://100014.pythonanywhere.com/en/");
      }
    } else {
      window.location.href = "https://100014.pythonanywhere.com/";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageName, navigate]);

  return customerSupportEligible ? (
    <CustomerSupport />
  ) : livingLabChatEligible ? (
    <LivingLabChat />
  ) : (
    <div className="flex justify-center items-center w-full h-screen">
      {window.location.hash.includes("living-lab-chat") ? (
        <span className="livingLab">Living Lab Chat</span>
      ) : (
        <span className="customerSupport">Customer Support</span>
      )}
    </div>
  );
};
