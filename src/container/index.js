import { useState } from "react";
import ChatSection from "./ChatSection";
import DetailsSection from "./Details/DetailsSection";
const Container = () => {
  // const [chatHeader, setChatHeader] = useState("");

  // const onSetChatHeader = (header) => setChatHeader(header);
  return (
    <div className="">
      <div className=" d-flex gap-2 justify-content-start justify-content-md-start justify-content-lg-start justify-content-xl-around justify-content-xxl-around my-1 mx-1 mx-md-1 mx-lg-1 mx-xl-2 mx-xxl-5 mt-3">
        <ChatSection />
        <div className="">
          <DetailsSection />
        </div>
      </div>
    </div>
  );
};

export default Container;
