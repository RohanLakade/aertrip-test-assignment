import React from "react";

import buttonStyles from "./renderbutton.module.css";

const RenderButton = ({ onClick, SearchText }) => {
  return (
    <button onClick={onClick} className={buttonStyles["common-btn"]}>
      {SearchText}
    </button>
  );
};

export default RenderButton;
