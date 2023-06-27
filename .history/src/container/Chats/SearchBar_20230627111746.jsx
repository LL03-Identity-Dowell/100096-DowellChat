import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import searchIcon from "../../assets/icons8-search-50.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from "./Icons";
import Rooms from "./rooms/Rooms";
import Scroll from "./rooms/Scroll";
// BsStarFill;
const SearchBar = ({ results }) => {
  const [search, setSearch] = useState("");
  return (
    <div className="container-full pt-2">
      <div className="overflow-y-scroll">
        <form className="mb-4">
          <div className="d-flex gap-2 inputBody rounded px-2 align-items-center">
            <img
              src={searchIcon}
              alt=""
              style={{ width: "20px", height: "20px" }}
            />
            <input
              className="inputs  rounded py-2 mr-4"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* <FontAwesomeIcon icon="fa-regular fa-magnifying-glass" /> */}

          {/* <i className="fa fa-search"></i> */}
        </form>
        <Icons />
      </div>
      {/* <Scroll results={results} /> */}
      <Rooms results={results} />
    </div>
  );
};

export default SearchBar;
