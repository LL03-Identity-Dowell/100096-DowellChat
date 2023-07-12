import { useContext } from "react";
import user from "../../assets/avatar.png";
import AboutDetails from "./AboutDetails";
import DetailsSectionButton from "./DetailsSectionButton";
import ProductContext from "../ContextProvider/DataContext";
const DetailsSection = ({ title, about }) => {
  const { userInfo } = useContext(ProductContext);
  // console.log(userInfo, "from details section");
  return (
    // <div className="container w-auto h-auto p-4 d-none d-md-none d-lg-none d-xl-block d-xxl-block">
    //   <div className="w-auto h-auto">
    //     <div className="cardBody">
    <div className="container cardBody mx-2 my-4">
      <div
        className="d-flex gap-5  "
        style={{ borderBottom: "1px solid #7A7A7A" }}
      >
        <figure className="d-flex gap-2">
          <img src={user} className=" image-style" />
          <div className="d-flex flex-column">
            <h3 className="fw-bold  text-nowrap" style={{ fontSize: "18px" }}>
              {userInfo?.username}
            </h3>
            <a
              href=""
              className=" text-nowrap text-primary text-decoration-none"
              style={{
                fontSize: "14px",
              }}
            >
              View Profile
            </a>
          </div>
        </figure>
        <DetailsSectionButton />
      </div>
      {/* DETAILS */}
      <AboutDetails />
    </div>
    //     </div>
    //   </div>
    // </div>
  );
};
DetailsSection.defaultProps = {
  title: "John Doe",
  about: "About",
};

export default DetailsSection;
