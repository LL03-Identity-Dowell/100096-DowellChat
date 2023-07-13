import { useContext, useEffect } from "react";
import user from "../../assets/avatar.png";
import AboutDetails from "./AboutDetails";
import DetailsSectionButton from "./DetailsSectionButton";
import ProductContext from "../ContextProvider/DataContext";
import { useQuery } from "react-query";
const DetailsSection = ({ title, about }) => {
  const { userInfo, getSessionIds, Id } = useContext(ProductContext);
  // const { data, isLoading, error } = useQuery(
  //   ["getSessionId", Id],
  //   () => getSessionIds(Id),
  //   [Id]
  // );
  useEffect(() => {
    getSessionIds(Id);
  }, [Id]);
  // console.log("data", data);
  // if (isLoading) return <div>Loading</div>;
  // if (error) return <div>Request Failed</div>;
  // console.log(data, "from details section");
  return (
    <div className="container w-100 d-none d-md-none d-lg-none d-xl-block d-xxl-block">
      <div className=" " style={{ width: "auto", height: "100%" }}>
        <div className="cardBody">
          <div className="mx-2 my-4">
            <div
              className="d-flex gap-5  "
              style={{ borderBottom: "1px solid #7A7A7A" }}
            >
              <figure className="d-flex gap-2">
                <img src={user} className=" image-style" />
                <div className="d-flex flex-column">
                  <h3
                    className="fw-bold  text-nowrap"
                    style={{ fontSize: "18px" }}
                  >
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
            <AboutDetails
            // data={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
DetailsSection.defaultProps = {
  title: "John Doe",
  about: "About",
};

export default DetailsSection;
