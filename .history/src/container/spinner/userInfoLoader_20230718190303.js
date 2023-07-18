import Lottie from "lottie-react";
import img from "../../assets/userinfoloader.json";

export const userInfoLoader = () => {
  const options = {
    animationData: img,
    loop: true,
    width: 50,
  };
  const style = {
    width: "200px",
    height: "200px",
  };

  return (
    <div className="" style={{ position: "relative" }}>
      <div className="" style={{}}>
        <Lottie animationData={img} loop={true} style={style} />
      </div>
    </div>
  );
};
