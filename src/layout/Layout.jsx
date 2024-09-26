import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../App.jsx";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Layout = ({ sortOption, setSortOption }) => {
  const { headerTitle } = useContext(AppContext);

  const isEventsPage = headerTitle?.toLowerCase().includes("events");

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="bg-slate-50 h-screen">
      <header className="p-5 pt-4 pb-0 text-3xl font-bold flex justify-between items-center ">
        {isEventsPage && (
          <div className=" mb-4 absolute top-4 left-5 text-center">
            <FormControl variant="outlined" size="small">
              <InputLabel id="sort-by-label">Sort by</InputLabel>
              <Select
                labelId="sort-by-label"
                value={sortOption}
                onChange={handleSortChange}
                label="Sort by"
                sx={{ minWidth: "212px", position: "relative" }}
              >
                <MenuItem value="title-asc">Title (A-Z)</MenuItem>
                <MenuItem value="title-desc">Title (Z-A)</MenuItem>
                <MenuItem value="eventDate-asc">Event Date (Earliest)</MenuItem>
                <MenuItem value="eventDate-desc">Event Date (Latest)</MenuItem>
                <MenuItem value="organizer-asc">Organizer (A-Z)</MenuItem>
                <MenuItem value="organizer-desc">Organizer (Z-A)</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
        {!isEventsPage && (
          <Link
            to="/"
            className="absolute top-4 left-5 text-sky-600 font-medium text-base outline outline-sky-600 outline-1 py-1 px-4 rounded-md transition duration-100 ease-in-out hover:bg-sky-800 hover:text-slate-200 hover:outline-none"
          >
            Back
          </Link>
        )}
        <p className="flex-grow text-center"> {headerTitle}</p>
      </header>
      <div className="p-5 pt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
