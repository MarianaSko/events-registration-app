import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { Route, Routes } from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import ParticipantsPage from "./pages/ParticipantsPage";
import RegistrationPage from "./pages/RegistrationPage";
import { toast } from "react-toastify";
import Layout from "./layout/Layout";

export const AppContext = createContext();

export const App = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [headerTitle, setHeaderTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeEvent, setActiveEvent] = useState(
    JSON.parse(localStorage.getItem("activeEvent")) || null
  );
  const [activeParticipants, setActiveParticipants] = useState(
    JSON.parse(localStorage.getItem("activeParticipants")) || []
  );
  const [sortOption, setSortOption] = useState("title-asc");

  const sortedEvents = [...events].sort((a, b) => {
    let comparison = 0;
    const [sortBy, sortOrder] = sortOption.split("-");

    if (sortBy === "title") {
      comparison = a.title.localeCompare(b.title);
    } else if (sortBy === "eventDate") {
      comparison = new Date(a.eventDate) - new Date(b.eventDate);
    } else if (sortBy === "organizer") {
      comparison = a.organizer.localeCompare(b.organizer);
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <AppContext.Provider
      value={{
        headerTitle,
        setHeaderTitle,
        isLoading,
        setIsLoading,
        error,
        setError,
        activeEvent,
        setActiveEvent,
        activeParticipants,
        setActiveParticipants,
        events,
        setEvents,
      }}
    >
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-50  z-50">
          <div className="animate-spin rounded-full border-8 border-t-8 border-gray-200 border-t-blue-600 w-16 h-16"></div>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Layout sortOption={sortOption} setSortOption={setSortOption} />
          }
        >
          <Route
            index
            element={
              <BoardPage
                events={sortedEvents}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            }
          ></Route>
          <Route
            path="participants"
            element={<ParticipantsPage></ParticipantsPage>}
          ></Route>
          <Route
            path="registration"
            element={<RegistrationPage></RegistrationPage>}
          ></Route>
        </Route>
      </Routes>
      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-50  z-50">
          <div className=" flex h-screen items-center	 justify-center bg-slate-50">
            <p className="text-sky-700 text-xl">{error}</p>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
};
