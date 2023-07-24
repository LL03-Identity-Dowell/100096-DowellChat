import Lottie from "lottie-react";
import img from "../../assets/animation_lk8ldsxu.json";

export const UserInfoLoader = () => {
  const options = {
    animationData: img,
    loop: true,
    width: 50,
  };
  const style = {
    width: "300px",
    height: "300px",
  };

  return (
    <div className="" style={{}}>
      <div
        className=""
        style={{
          marginTop: "200px",
        }}
      >
        <Lottie animationData={img} loop={true} style={style} />
      </div>
    </div>
  );
};