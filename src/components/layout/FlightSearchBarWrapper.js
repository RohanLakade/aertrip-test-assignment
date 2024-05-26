import React, { useEffect, useState } from "react";
import searchStyle from "../../styles/searchbar.module.css";
import CustomDropdown from "../common/CustomDropdown";
import { searchbarData } from "../../utilities/utils/masterData";
import PassengerDropdownCounter from "../common/PassengerDropdownCounter";
import SearchInputField from "../../utilities/formFields/SearchInputField";
import RenderButton from "../../utilities/formFields/RenderButton";
import RenderDate from "../../utilities/formFields/RenderDate";

function FlightSearchBarWrapper({ airportCodes, onSearchFlightData }) {
  const [searchFromValues, setsearchFromValues] = useState({
    fr: "",
    to: "",
    dd: "",
  });

  const onSelectValue = (value, cat) => {
    setsearchFromValues({
      ...searchFromValues,
      [cat]: value,
    });
  };
  const searchFlights = () => {
    onSearchFlightData(searchFromValues);
  };

  useEffect(() => {}, [searchFromValues]);

  return (
    <div className={searchStyle["searchbar-wrapper"]}>
      <div className={searchStyle["passengers-booking-filters"]}>
        <div className={searchStyle["dropdown-filters-group"]}>
          <CustomDropdown data={searchbarData?.trip_type} />
          <PassengerDropdownCounter data={searchbarData?.passenger_data} />
          <CustomDropdown data={searchbarData?.class_values} />
        </div>
        <div className={searchStyle["recent-searches"]}>
          <div className={searchStyle["custom-dropdown"]}>
            <div className={searchStyle["dropdown-value"]}></div>
            <div className={searchStyle["dropdown-options"]}></div>
          </div>
        </div>
      </div>
      <div className={searchStyle["search-flight-details"]}>
        <div
          className={searchStyle["search-flight-input-group"]}
        >
          {airportCodes && (
            <SearchInputField
              data={airportCodes || []}
              label="From"
              onChange={onSelectValue}
            />
          )}
          {airportCodes && (
            <SearchInputField
              data={airportCodes || []}
              label="To"
              onChange={onSelectValue}
            />
          )}
          {<RenderDate onChange={onSelectValue} />}
          <RenderButton SearchText="Search" onClick={searchFlights} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(FlightSearchBarWrapper);
