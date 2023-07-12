import React from "react";

const Footer = () => {
  return (
    <div className=" border-top" style={{ height: "4rem" }}>
      <div className="d-flex justify-content-center py-4">
        <div className="text-center">
          <small className="">
            Copyright &copy; 2023 UX Living Lab Chat | Powered by{" "}
            <a className="text-primary ">Dowell uxlivinglab</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Footer;
