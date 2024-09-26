import React, { useCallback, useContext, useEffect, useState } from "react";
import { api } from "../../configAPI/api";
import { Pagination } from "@mui/material";
import { AppContext } from "../../App.jsx";
import { useNavigate } from "react-router-dom";
import StyledButton from "../StyledButton.jsx";

const Board = ({ events, currentPage, setCurrentPage }) => {
  const [eventsPerPage] = useState(8);

  const {
    setHeaderTitle,
    setIsLoading,
    setError,
    setActiveEvent,
    setActiveParticipants,
    setEvents,
  } = useContext(AppContext);
  const navigate = useNavigate();

  const getEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/events");
      setEvents(response.data);
    } catch (error) {
      setError("Failed to fetch events. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [setError, setEvents, setIsLoading]);

  useEffect(() => {
    getEvents();
    setHeaderTitle("Events");
  }, [getEvents, setHeaderTitle]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const onViewClick = (title, chosenEventID) => {
    const participants = events.find(
      (event) => event._id === chosenEventID
    )?.participants;
    setActiveParticipants(participants);
    localStorage.setItem("activeParticipants", JSON.stringify(participants));

    localStorage.setItem(
      "activeEvent",
      JSON.stringify({
        id: chosenEventID,
        title: title,
      })
    );
    setActiveEvent({
      id: chosenEventID,
      title: title,
    });
    navigate("/participants");
  };

  const onRegisterClick = (title, chosenEventID) => {
    navigate("/registration");
    localStorage.setItem(
      "activeEvent",
      JSON.stringify({
        id: chosenEventID,
        title: title,
      })
    );
    setActiveEvent({
      id: chosenEventID,
      title: title,
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {currentEvents.map((event) => (
          <div
            key={event._id}
            className="flex flex-col h-full justify-between p-4 border rounded-md gap-4 shadow-md min-h-[274px]"
          >
            <div className="flex flex-col h-full justify-between gap-2 ">
              <h2 className="font-bold text-lg text-sky-800 text-center">
                {event.title}
              </h2>
              <p className="text-justify">{event.description}</p>
              <p className="text-sky-800 text-sm font-medium">
                <span className="text-black opacity-50 font-normal">Date:</span>
                {new Date(event.eventDate).toLocaleDateString()}
              </p>
              <p className="text-sky-800 text-sm font-medium">
                <span className="text-black opacity-50 font-normal">
                  Organized by:
                </span>
                {event.organizer}
              </p>
            </div>
            <div className="flex justify-between">
              <StyledButton
                onClick={() => onRegisterClick(event.title, event._id)}
              >
                Register
              </StyledButton>
              <StyledButton onClick={() => onViewClick(event.title, event._id)}>
                View
              </StyledButton>
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-full justify-center mt-6">
        <Pagination
          count={Math.ceil(events.length / eventsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </div>
    </>
  );
};

export default Board;
