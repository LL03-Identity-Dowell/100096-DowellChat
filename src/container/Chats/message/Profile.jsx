import React from "react";
import ProfileHead from "./ProfileHead";
import ReplyChat from "./ReplyChat";

const Profile = ({ productName }) => {
  return (
    <div
      className="w-100 mr-2 w-md-100 w-lg-75 w-xl-75 w-xxl-75 style mb-5 mb-md-5 mb-lg-2 mb-xl-0 mb-xxl-0"
      // style={{ maxWidth: "75%" }}
    >
      <ProfileHead chatHeader={productName} />
      {/* <ReplyChat /> */}
    </div>
  );
};

export default Profile;
