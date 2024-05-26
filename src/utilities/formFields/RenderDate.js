import React from "react";
import inputStyles from "./searchinput.module.css";

function RenderDate({ onChange }) {
  return (
    <div>
      <label style={{ display: "block" }}>Depart</label>
      <input
        className={inputStyles["search-select"]}
        type="date"
        id="dd"
        name="dd"
        onChange={(e) => onChange(e.target.value, "dd")}
      ></input>
    </div>
  );
}

export default React.memo(RenderDate);
