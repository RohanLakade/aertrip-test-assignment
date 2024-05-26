import React, { useEffect, useRef, useState } from "react";
import commonStyle from "../../styles/common.module.css";
import { generateUniqueID } from "../../utilities/utils/helper";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import PriceRangeSlider from "./PriceRangeSlider";

export default function CustomSortDropdown({
  data,
  getSortedData,
  filterPriceRangeData,
  type = "common",
  finalData,
}) {
  const boxRef = useRef();
  const [selectedVal, setSelectedVal] = useState({});
  const [clickCounter, setClickCounter] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setSelectedVal(data[0]);
  }, [data]);

  useOutsideClick(boxRef, () => setIsPopupOpen(false));

  const handleFiltersClick = (item) => {
    if (selectedVal.name != item.name) {
      setSelectedVal(item);
      setClickCounter(1);
      getSortedData(item, 1);
    } else {
      setClickCounter(clickCounter + 1);
      getSortedData(item, clickCounter + 1);
    }
  };

  const handleClearClick = () => {
    setSelectedVal({});
    getSortedData({});
    setIsPopupOpen(false);
  };

  const handleRadioToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div
      className={
        commonStyle["custom-dropdown"] +
        " " +
        commonStyle["custom-sort-dropdown"]
      }
      key={generateUniqueID()}
      ref={boxRef}
    >
      <div
        className={commonStyle["dropdown-value"]}
        onClick={() => setIsPopupOpen(!isPopupOpen)}
      >
        {type === "price"
          ? "Price"
          : selectedVal?.name == undefined
          ? "Sort By:"
          : selectedVal?.name}

        <span
          className={
            isPopupOpen
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
          (isPopupOpen ? " " + commonStyle["active"] : "") +
          " " +
          commonStyle["medium"]
        }
      >
        <div className={commonStyle["header"]}>
          <div>Sort</div>
          <div className={commonStyle["close-option"]}>
            <span
              className={commonStyle["clear-btn"]}
              onClick={handleClearClick}
            >
              Clear
            </span>
            <span
              className={commonStyle["close-icon"]}
              onClick={() => setIsPopupOpen(false)}
            >
              <img
                src="https://d2mccptxtk231d.cloudfront.net/v2_d_app/327/dist/8162b29c180c96cf0d0d.svg"
                alt=""
              />
            </span>
          </div>
        </div>

        {type === "price" ? (
          <>
            <div className={commonStyle["refundable-price"]}>
              <div>Refendable Fares Only</div>
              <div>
                <label>
                  <input
                    type="radio"
                    checked={isChecked}
                    onChange={handleRadioToggle}
                  />
                </label>
              </div>
            </div>
            <PriceRangeSlider
              getSortedData={getSortedData}
              data={data[0]}
              filterPriceRangeData={filterPriceRangeData}
              finalData={finalData}
            />
          </>
        ) : (
          <ul>
            {data.length > 0 &&
              data.map((item, index) => (
                <li
                  className={
                    selectedVal?.name == item?.name ? commonStyle["active"] : ""
                  }
                  onClick={() => handleFiltersClick(item)}
                  key={index}
                >
                  <div className={commonStyle["info"]}>
                    <span>{item?.name}</span>
                    <span>
                      <img
                        src="https://d2mccptxtk231d.cloudfront.net/v2_d_app/327/dist/3d6c82afe22dbeaac809.svg"
                        alt=""
                      />
                    </span>
                    <span>
                      <img
                        src="https://d2mccptxtk231d.cloudfront.net/v2_d_app/327/dist/c34b50a0abb9fde7b37b.svg"
                        alt=""
                      />
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
