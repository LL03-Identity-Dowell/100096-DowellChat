import { useState, useContext } from "react";
import ChatSection from "./ChatSection";
import DetailsSection from "./Details/DetailsSection";
import ReplyChat from "./Chats/message/ReplyChat";
import ProductContext from "./ContextProvider/DataContext";
import { userInfoLoader } from "./spinner/userInfoLoader";
const Container = ({ pageName = "default" }) => {
  // const [chatHeader, setChatHeader] = useState("");
  const { loading } = useContext(ProductContext);
  // const onSetChatHeader = (header) => setChatHeader(header);
  return (
    <div className="">
      <div className=" d-flex gap-2 justify-content-start justify-content-md-start justify-content-lg-start justify-content-xl-around justify-content-xxl-around  mx-1 mx-md-1 mx-lg-1 mx-xl-2 mx-xxl-5 mt-2">
        <ChatSection pageName={pageName} />
        {/* <ReplyChat /> */}
        {loading ? <userInfoLoader /> : <DetailsSection />}
      </div>
    </div>
  );
};

export default Container;
