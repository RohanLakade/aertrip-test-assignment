import React from "react";

import inputStyles from "./searchinput.module.css";

function SearchInputField({ label, data, onChange }) {
  const cat = label === "From" ? "fr" : "to";

  return (
    <div>
      <label style={{ display: "block" }}>{label}</label>
      <select
        name={label}
        className={inputStyles["search-select"]}
        onChange={(e) => onChange(e.target.value, cat)}
      >
        <option value="" style={{ display: "flex" }}>
          Select City
        </option>
        {Object.entries(data).map((value) => {
          const [cityCode, cityDet] = value;

          return (
            <option value={cityCode} key={cityCode} style={{ display: "flex" }}>
              <div>{cityCode}</div>
              <div>
                <p>
                  {cityDet.c}, {cityDet.cn}
                </p>
                <p>{cityDet.n}</p>
              </div>
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default React.memo(SearchInputField);
