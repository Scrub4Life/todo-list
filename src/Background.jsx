import React from "react";
import backgroundDark from "./images/bg-desktop-dark.jpg";
import backgroundLight from "./images/bg-desktop-light.jpg";

const Background = ({ displayMode }) => {
  return (
    <div
      className="relative bg-cover h-60 w-full"
      style={{
        backgroundImage: `url(${
          displayMode ? backgroundDark : backgroundLight
        })`,
      }}
    ></div>
  );
};

export default Background;
