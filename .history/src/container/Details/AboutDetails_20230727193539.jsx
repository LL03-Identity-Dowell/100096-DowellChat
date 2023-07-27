import { useContext } from "react";
import {
  FaPhone,
  FaBriefcase,
  FaGraduationCap,
  FaLocationArrow,
  FaRegThumbsUp,
} from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import ProductContext from "../ContextProvider/DataContext";
import { FaCaretSquareUp, FaRegEnvelope } from "react-icons/fa";
import { BiWorld, BiLike } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
const AboutDetails = ({ title, ux }) => {
  const { userInfo, userInfoAlternate, Id } = useContext(ProductContext);
  const data = [
    {
      phone: "Phone Number",
      email: "Email",
      web: "Website",
    },
  ];
  return (
    <div
      className="container"
      style={{ marginBottom: "1rem", marginTop: "1rem" }}
    >
      <div className="lh-lg">
        <h5 className="mb-2 fs-6 fw-bold">{title}</h5>
        <main>
          <p style={{ color: "#94a3b8", fontSize: "14px" }}>Added Details</p>
          <div className="">
            <ul className="p-0">
              <li style={{ color: "#94a3b8" }}>
                <small className="d-flex gap-2 align-items-center">
                  <FaPhone className="fw-bold fs-6" /> +{" "}
                  <span className="" style={{ fontSize: "13px" }}>
                    {/* userName not found */}
                    {userInfo ? userInfo?.phone : userInfoAlternate?.phone}
                  </span>
                </small>
              </li>
              <li style={{ color: "#94a3b8" }}>
                <small className="d-flex gap-2 align-items-center">
                  <FaRegEnvelope className="fw-bold fs-6" /> +{" "}
                  <span className="" style={{ fontSize: "13px" }}>
                    {userInfo ? userInfo?.email : userInfoAlternate?.email}
                  </span>
                </small>
              </li>
              <li style={{ color: "#94a3b8" }}>
                <small className="d-flex gap-2 align-items-center">
                  <BiWorld className="fw-bold fs-5" /> +{" "}
                  <span className="" style={{ fontSize: "13px" }}>
                    {userInfo
                      ? userInfo?.userBrowser
                      : userInfoAlternate?.userBrowser}
                  </span>
                </small>
              </li>
              <li style={{ color: "#94a3b8" }}>
                <small className="d-flex align-items-center gap-2">
                  {/* <AiFillHome /> + Address */}
                  <HiHome className="fw-bold fs-5" /> +{" "}
                  <span className="" style={{ fontSize: "13px" }}>
                    {userInfo
                      ? userInfo?.timezone
                      : userInfoAlternate?.timezone}
                  </span>
                </small>
              </li>
            </ul>
          </div>
        </main>
      </div>
      <div
        className="lh-lg "
        style={{ marginTop: "2rem", marginBottom: "8.9rem" }}
      >
        <h5 className="fs-6 fw-bold">{ux}</h5>
        <main>
          <div className="">
            <ul className="p-0">
              <li
                style={{ color: "#94a3b8" }}
                className="d-flex gap-2 align-items-center"
              >
                <FaRegThumbsUp className="fw-bold fs-6" />{" "}
                {userInfo
                  ? userInfo?.dowell_time
                  : userInfoAlternate?.dowell_time}
                {/* date from the api */}
              </li>
              <li style={{ color: "#94a3b8" }}>
                <FaBriefcase className="fw-bold fs-6" /> Works at Graphic
                Designer
              </li>
              <li style={{ color: "#94a3b8" }}>
                <FaGraduationCap className="fw-bold fs-4" /> <br /> Studied at
                Harvard University Cambridge
                {/* Place of work from the api */}
              </li>
              <li style={{ color: "#94a3b8" }}>
                <FaLocationArrow className="fw-bold fs-6" /> From
                <span>
                  {" "}
                  {userInfo
                    ? userInfo?.user_country
                    : userInfoAlternate?.user_country}
                </span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AboutDetails;

AboutDetails.defaultProps = {
  title: "About",
  ux: "UX Living Lab Profile",
};
// color: "#54595F",
