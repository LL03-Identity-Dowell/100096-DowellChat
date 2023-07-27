import { useState, useContext } from "react";
import ChatSection from "./ChatSection";
import DetailsSection from "./Details/DetailsSection";
import ReplyChat from "./Chats/message/ReplyChat";
import ProductContext from "./ContextProvider/DataContext";
import { UserInfoLoader } from "./spinner/userInfoLoader";
import { LoaderIcon } from "react-hot-toast";
import { Loader } from "./spinner/loader";
import Skeleton, {
  SkeletonTheme,
  SkeletonStyleProps,
  SkeletonProps,
  SkeletonThemeProps,
} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Container = ({ pageName = "default" }) => {
  // const [chatHeader, setChatHeader] = useState("");
  const { loading } = useContext(ProductContext);
  // const onSetChatHeader = (header) => setChatHeader(header);
  const style = {
    width: "60px",
    height: "60px",
    marginLeft: "70px",
    marginTop: "30%",
  };
  return (
    <div className="">
      <div className=" d-flex gap-2 justify-content-start justify-content-md-start justify-content-lg-start justify-content-xl-around justify-content-xxl-around  mx-1 mx-md-1 mx-lg-1 mx-xl-2 mx-xxl-5 mt-2">
        <ChatSection pageName={pageName} />
        {/* <ReplyChat /> */}
        {loading ? (
          <div className="d-flex" style={{ width: "500px" }}>
            <Skeleton
              count={8}
              height={90}
              width={300}
              containerClassName=""
              style={{ width: "500px" }}
            />
          </div>
        ) : (
          <DetailsSection />
        )}
      </div>
    </div>
  );
};

export default Container;
