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
  // const searchItems = [
  //   { id: 1, name: "usman", room_id: 25 },
  //   { id: 1, name: "usman", room_id: 25 },
  //   { id: 1, name: "usman", room_id: 25 },
  //   { id: 1, name: "usman", room_id: 25 },
  // ];
  // const setChange = (e) => {
  //   const filteredSearch = searchItems.filter((s) => s.search === search.name);
  //   console.log(filteredSearch);
  // };
  // console.log(search);
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
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg> */}
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
