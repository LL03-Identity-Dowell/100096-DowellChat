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
  const { userInfo } = useContext(ProductContext);
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
            <ul>
              <li style={{ color: "#94a3b8" }}>
                <small>
                  <FaPhone className="fw-bold fs-6" /> +{" "}
                  <span className="" style={{ fontSize: "13px" }}>
                    userName not found
                    {userInfo?.phone}
                  </span>
                </small>
              </li>
              <li style={{ color: "#94a3b8" }}>
                <small className="d-flex gap-2 align-items-center">
                  <FaRegEnvelope className="fw-bold fs-6" /> +{" "}
                  <span className="" style={{ fontSize: "13px" }}>
                    {userInfo?.email}
                  </span>
                </small>
              </li>
              <li style={{ color: "#94a3b8" }}>
                <small>
                  <BiWorld className="fw-bold fs-5" /> +{" "}
                  <span className="" style={{ fontSize: "13px" }}>
                    {userInfo?.userBrowser}
                  </span>
                </small>
              </li>
              <li style={{ color: "#94a3b8" }}>
                <small>
                  {/* <AiFillHome /> + Address */}
                  <HiHome className="fw-bold fs-5" /> +{" "}
                  <span className="" style={{ fontSize: "13px" }}>
                    {userInfo?.user_country}
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
            <ul>
              <li style={{ color: "#94a3b8" }}>
                <FaRegThumbsUp className="fw-bold fs-6" />{" "}
                {userInfo?.dowell_time}
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
                <span> {userInfo?.user_country}</span>
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
