import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import FlightListWrapper from "./pages/flights/FlightListWrapper";
import SortAndFilters from "./pages/flights/SortAndFilters";
import flightJSonData from "./utilities/services/apiData.json";
import { getFlightCodes } from "./utilities/utils/getFlightCodes";

function App() {
  const [flightData] = useState(flightJSonData?.data?.flights);
  const [filteredData, setFilteredData] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [sortOptions, setSortOptions] = useState([]);

  const {airportCodes} = getFlightCodes(flightData);
  const {flightCodes} = getFlightCodes(flightData);
  
  const onSearchFlightData = useCallback((formvalues) => {
    let tempSortArray = [];
    const resultsArr = [];
    flightData.length > 0 &&
      flightData.forEach((data) => {
        const flightDet = data?.results?.j;
        let fr = "";
        let to = "";
        let dd = "";
        flightDet.forEach((det) => {
          fr = det.ap[0];
          to = det.ap[1];
          dd = det.ad;

          if (
            formvalues.fr === fr &&
            formvalues.to === to &&
            formvalues.dd === dd
          ) {
            resultsArr.push(det);
          }
        });

        tempSortArray = [...tempSortArray, ...data.results.f];
      });
    if (tempSortArray.length > 0) {
      const { pr, dt, at, tt } = tempSortArray[1];
      pr.name = "Price";
      dt.name = "Departure Time";
      at.name = "Arrival Time";
      tt.name = "Total Duration";
      setSortOptions([pr, dt, at, tt]);
    }
    setFilteredData(resultsArr || []);
    setFinalData(resultsArr || []);
  }, [flightData]);

  const filterPriceRangeData = useCallback(
    (min, max, data) => {
      let filteredAndSortedData = data && data.filter(
        (data) => data.farepr >= min && data.farepr <= max
      );

      console.log("filteredAndSortedData", filteredAndSortedData);
      return filteredAndSortedData;
    },
    []
  );

  useEffect(() => {
    setFinalData(filterPriceRangeData)
  }, [filterPriceRangeData])
  

  const getSortedData = useCallback(
    (item = {}, count = 0) => {
      if (Object.keys(item).length > 0) {
        let key = count % 2 === 0 ? Object.keys(item)[1] : Object.keys(item)[0];
        let value = item[key];

        let filteredAndSortedData = filteredData.slice().sort((a, b) => {
          if (item.name === "Price") {
            return Math.abs(a.farepr - value) - Math.abs(b.farepr - value);
          } else if (item.name === "Departure Time") {
            const today = new Date().toISOString().split("T")[0];

            const dateA = new Date(a.dd + "T" + a.dt);
            const dateB = new Date(b.dd + "T" + b.dt);

            const timeA = new Date(today + "T" + value);
            const timeB = new Date(today + "T" + value);

            const diffA = Math.abs(dateA - timeA);
            const diffB = Math.abs(dateB - timeB);

            if (diffA === diffB) {
              return dateA - dateB;
            }
            return diffA - diffB;
          } else if (item.name === "Arrival Time") {
          } else if (item.name === "Total Duration") {
            const diffA = Math.abs(a.tt[0] - value);
            const diffB = Math.abs(b.tt[0] - value);
            return diffA - diffB;
          }
        });
        setFinalData(filteredAndSortedData);
      } else {
        setFinalData(filteredData);
      }
    },
    [filteredData]
  );

  return (
    <div className="app">
      <header>
        <Header
          airportCodes={airportCodes || []}
          onSearchFlightData={onSearchFlightData}
        />
      </header>
      <main className="container">
        <SortAndFilters
          sortOptions={sortOptions}
          getSortedData={getSortedData}
          filterPriceRangeData={filterPriceRangeData}
          finalData={finalData}
        />
        {filteredData && finalData && (
          <FlightListWrapper
            filteredData={filteredData}
            finalData={finalData}
            flightCodes={flightCodes}
          />
        )}
      </main>
    </div>
  );
}

export default App;
