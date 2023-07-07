import React from "react";
import ProfileHead from "./ProfileHead";
import ReplyChat from "./ReplyChat";

const Profile = ({ productName }) => {
  return <ProfileHead chatHeader={productName} />;
};

export default Profile;
