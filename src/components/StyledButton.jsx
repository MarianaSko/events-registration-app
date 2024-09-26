import React from "react";

const StyledButton = ({ onClick, children, isRegistration }) => {
  return (
    <button
      onClick={onClick}
      type={isRegistration ? "submit" : "button"}
      className={`text-sky-600 min-w-20 rounded-md p-1 font-medium transition duration-100 ease-in-out hover:bg-sky-800 hover:text-slate-200 ${
        isRegistration
          ? "outline outline-sky-600 outline-1 hover:outline-none"
          : ""
      }`}
    >
      {children}
    </button>
  );
};

export default StyledButton;
