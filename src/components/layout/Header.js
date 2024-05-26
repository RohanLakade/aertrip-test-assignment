import React from "react";
import TopHeader from "./TopHeader";
import FlightSearchBarWrapper from "./FlightSearchBarWrapper";

export default function Header({airportCodes, onSearchFlightData}) {
  return (
    <>
      <TopHeader />
      <FlightSearchBarWrapper 
        airportCodes={airportCodes} 
        onSearchFlightData={onSearchFlightData}
        />
    </>
  );
}
