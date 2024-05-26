import React, { useEffect, useRef, useState } from "react";
import commonStyle from "../../styles/common.module.css";
import { generateUniqueID } from "../../utilities/utils/helper";
import { useOutsideClick } from "../../hooks/useOutsideClick";

export default function SearchDropdown({ data = [] }) {
  const boxRef = useRef();
  const [selectedVal, setSelectedVal] = useState(data);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setSelectedVal(data[0]);
  }, [data]);

  useOutsideClick(boxRef, () => setIsActive(false));

  return (
    <div
      className={commonStyle["custom-dropdown"]}
      key={generateUniqueID()}
      ref={boxRef}
    >
      <div
        className={commonStyle["dropdown-value"]}
        onClick={() => setIsActive(!isActive)}
      >
        <span className={commonStyle["icon"]}>
          <img src={selectedVal.img_url} alt="" />
        </span>
        {selectedVal.value}
        <span
          className={
            isActive
              ? commonStyle["reverse-arrow"]
              : commonStyle["dropdown-arrow"]
          }
        >
          <img
            src="https://d2mccptxtk231d.cloudfront.net/v2_d_app/327/dist/0d4d2725ac6487d70197.svg"
            alt=""
          />
        </span>
      </div>
      <div
        className={
          commonStyle["dropdown-options"] +
          (isActive ? " " + commonStyle["active"] : "") +
          " " +
          commonStyle["medium"]
        }
      >
        <ul>
          {data.length > 0 &&
            data.map((item, index) => (
              <li
                className={
                  selectedVal.name == item.name ? commonStyle["active"] : ""
                }
                onClick={() => setSelectedVal(item)}
                key={index}
              >
                <span className={commonStyle["icon"]}>
                  <img src={item.img_url} alt={item.name} />
                </span>

                <div className={commonStyle["info"]}>
                  <span>{item.value}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
