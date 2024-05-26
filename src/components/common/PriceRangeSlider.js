import React, { useEffect, useRef, useContext } from "react";
import commonStyle from "../../styles/common.module.css";
import useDebounce from "../../hooks/useDebounce";
import { AppContext } from "../../context/ContextProvider";

function PriceRangeSlider({filterPriceRangeData, finalData }) {
  const { minValue, maxValue, setMinValue, setMaxValue } =
    useContext(AppContext);

  const minRangeRef = useRef(null);
  const maxRangeRef = useRef(null);
  const debouncedMinPrice = useDebounce(minValue, 1000);
  const debouncedMaxPrice = useDebounce(maxValue, 1000);

  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minValue + 1);
    setMaxValue(value);
  };

  useEffect(() => {
    if (minRangeRef.current && maxRangeRef.current) {
      const minPercent = (minValue / maxRangeRef.current.max) * 100;
      const maxPercent = (maxValue / maxRangeRef.current.max) * 100;
      minRangeRef.current.style.zIndex =
        minValue > maxRangeRef.current.value - maxValue / 100 ? "1" : "0";
      maxRangeRef.current.style.zIndex =
        minValue > maxRangeRef.current.value - maxValue / 100 ? "0" : "1";
      document.documentElement.style.setProperty(
        "--min-range",
        `${minPercent}%`
      );
      document.documentElement.style.setProperty(
        "--max-range",
        `${maxPercent}%`
      );
    }
  }, [minValue, maxValue]);

  useEffect(() => {
    filterPriceRangeData(minValue, maxValue, finalData );
  }, [debouncedMinPrice, debouncedMaxPrice, filterPriceRangeData, finalData]);

  return (
    <div className={commonStyle["price-option"]}>
      <div className={commonStyle["price-range"]}>
        <div>₹ {minValue}</div>
        <div>₹ {maxValue}</div>
      </div>
      <div className="price-range-slider">
        <div className="slider-container">
          <div className="range-slider">
            <input
              type="range"
              ref={minRangeRef}
              min="0"
              max="60000"
              value={minValue}
              onChange={handleMinChange}
            />
            <input
              type="range"
              ref={maxRangeRef}
              min="0"
              max="60000"
              value={maxValue}
              onChange={handleMaxChange}
            />
            <div
              className="track"
              style={{
                left: `${(minValue / 60000) * 100}%`,
                right: `${100 - (maxValue / 60000) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PriceRangeSlider);
