import React from "react";
import Board from "../components/board/Board";

const BoardPage = ({ events, currentPage, setCurrentPage }) => {
  return (
    <Board
      events={events}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};

export default BoardPage;
