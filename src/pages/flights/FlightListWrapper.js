import listingStyle from "../../styles/flight_listing.module.css";
import { generateUniqueID } from "../../utilities/utils/helper";
import ResultCard from "./ResultCard";

export default function FlightListWrapper({
  filteredData = [],
  finalData = [],
  flightCodes,
}) {
  return (
    <div className={listingStyle["flight-list-wrapper"]}>
      <div className={listingStyle["result-info"]}>
        <span>
          {finalData?.length} of {filteredData?.length} results
        </span>
      </div>
      <div className={listingStyle["results-wrapper"]}>
        {finalData?.length > 0 &&
          finalData.map((card, index) => (
            <ResultCard
              key={generateUniqueID()}
              data={card}
              flightCodes={flightCodes}
            />
          ))}
      </div>
    </div>
  );
}
