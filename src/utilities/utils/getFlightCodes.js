export const getFlightCodes = (flightData) => {
  let airportCodes = {};
  let flightCodes = {};
  flightData?.length > 0 &&
    flightData.forEach((data) => {
      airportCodes = { ...airportCodes, ...data?.results?.apdet };
      flightCodes = { ...flightCodes, ...data?.results?.aldet };
    });
  return { airportCodes, flightCodes };
};
