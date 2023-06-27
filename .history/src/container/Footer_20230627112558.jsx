import React from "react";

const Footer = () => {
  return (
    <footer
      className="text-center text-white fixed-bottom border-top"
      style={{ backgroundColor: "white" }}
    >
      <div class="container p-2"></div>
      <div className="text-center p-2 text-black">
        Copyright &copy; 2023 UX Living Lab Chat | Powered by{" "}
        <a className="text-primary ">Dowell uxlivinglab</a>
      </div>
    </footer>
  );
};

export default Footer;
