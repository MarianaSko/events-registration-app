import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App.jsx";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const Participants = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { setHeaderTitle, activeEvent, activeParticipants } =
    useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeEvent) {
      navigate("/");
    } else {
      setHeaderTitle(`${activeEvent.title} participants`);
    }
  }, [activeEvent, navigate, setHeaderTitle]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredParticipants = activeParticipants.filter(
    (participant) =>
      participant.name.toLowerCase().includes(searchQuery) ||
      participant.email.toLowerCase().includes(searchQuery)
  );

  return (
    <div>
      {activeParticipants.length !== 0 && (
        <div className="mb-4 flex justify-center">
          <TextField
            label="Search by name or email"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-[20%]"
          />
        </div>
      )}
      {filteredParticipants.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {filteredParticipants.map((participant) => (
            <div
              key={participant._id}
              className="flex flex-col h-full justify-between p-4 border rounded-md gap-4 shadow-md "
            >
              <div className="flex flex-col h-full justify-between gap-2 ">
                <h3 className="font-bold text-lg text-sky-800 truncate">
                  {participant.name}
                </h3>
                <p className="text-justify truncate">{participant.email}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-semibold text-md text-sky-800 text-center">
          {searchQuery
            ? "No participants match your search."
            : "This event has no participants yet."}
        </p>
      )}
    </div>
  );
};

export default Participants;
