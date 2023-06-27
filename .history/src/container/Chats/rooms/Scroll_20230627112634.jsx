import React from "react";
import "./scroll.css";
import SearchBar from "../SearchBar";
const Scroll = ({ results }) => {
  return (
    <div className="">
      <div id="wrapper">
        <div className="scrollbar" id="style-1">
          <div className="force-overflow">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scroll;
