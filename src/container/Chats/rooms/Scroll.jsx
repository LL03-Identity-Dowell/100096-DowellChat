import React from "react";
import "./scroll.css";
// import Message from "./Message";
import Rooms from "./Rooms";
import SearchBar from "../SearchBar";
const Scroll = ({ results }) => {
  return (
    <div className="">
      <div id="wrapper">
        <div class="scrollbar" id="style-1">
          <div class="force-overflow">
            {/* <Rooms results={results} /> */}
            <SearchBar />
          </div>
        </div>

        {/* <div class="scrollbar" id="style-2">
          <div class="force-overflow"></div>
        </div> */}
      </div>
    </div>
  );
};

export default Scroll;
