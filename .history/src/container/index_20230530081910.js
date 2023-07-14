import { useState } from "react";
import ChatSection from "./ChatSection";
import DetailsSection from "./Details/DetailsSection";
const Container = () => {
  // const [chatHeader, setChatHeader] = useState("");

  // const onSetChatHeader = (header) => setChatHeader(header);
  return (
    <div className="">
      <div className="d-flex gap-5 justify-content-start justify-content-md-start justify-content-lg-around justify-content-xl-around justify-content-xxl-around my-1 mx-2 mx-md-3 mx-lg-4 mx-xl-5 mx-xxl-5 mt-3">
        <ChatSection />
        <div className="">
          <DetailsSection />
        </div>
      </div>
    </div>
  );
};

export default Container;
