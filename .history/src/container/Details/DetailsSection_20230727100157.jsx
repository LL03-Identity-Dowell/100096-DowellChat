import { useContext, useEffect } from "react";
import user from "../../assets/avatar.png";
import AboutDetails from "./AboutDetails";
import DetailsSectionButton from "./DetailsSectionButton";
import ProductContext from "../ContextProvider/DataContext";
import { useQuery } from "react-query";
import Skeleton, {
  SkeletonTheme,
  SkeletonStyleProps,
  SkeletonProps,
  SkeletonThemeProps,
} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
const DetailsSection = ({ title, about }) => {
  const { userInfo, Id, userInfoAlternate, searchParams } =
    useContext(ProductContext);
  // const { data, isLoading, error } = useQuery(
  //   ["getSessionId", Id],
  //   () => getSessionIds(Id),
  //   [Id]
  // );
  // useEffect(() => {
  //   getSessionIds(Id);
  // }, [Id]);
  // console.log("data", data);
  // if (isLoading) return <div>Loading</div>;
  // if (error) return <div>Request Failed</div>;
  // console.log(data, "from details section");\
  const userInfoData = async () => {
    if (Id) {
      const res = await axios.post(
        "https://100093.pythonanywhere.com/api/userinfo/",
        {
          session_id: Id,
        }
      );
      console.log(res?.data);
      return res?.data;
    } else {
      const res = await axios.post(
        "https://100093.pythonanywhere.com/api/userinfo/",
        searchParams
      );
      console.log(res?.data);
      return res?.data;
    }
  };
  const { isLoading, data, loading } = useQuery([], () =>
    userInfoData(Id, searchParams)
  );
  if (isLoading) {
    <div className="d-flex" style={{ width: "500px" }}>
      <Skeleton
        count={10}
        height={90}
        width={300}
        containerClassName=""
        style={{ width: "500px" }}
      />
    </div>;
  }
  return (
    <div className="container w-100 d-none d-md-none d-lg-none d-xl-block d-xxl-block">
      <div
        className=" "
        style={{ width: "auto", height: "100%", minWidth: "250px" }}
      >
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
                    {data?.username}
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
