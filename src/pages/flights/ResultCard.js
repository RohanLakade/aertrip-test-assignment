import React from "react";
import listingStyle from "../../styles/flight_listing.module.css";
import { secondsToHoursAndMinutes } from "../../utilities/utils/helper";
import { flightThumbnails } from "../../utilities/utils/masterData";

export default function ResultCard({ data, flightCodes }) {
  const {
    leg: [
      {
        flights: [{ fr, dt, to, at, al, ft }],
      },
    ],
    farepr,
  } = data;

  const { hours, minutes } = secondsToHoursAndMinutes(data.tt[0]);

  return (
    <div className={listingStyle["result-card"]}>
      <div className={listingStyle["card-header"]}></div>
      <div className={listingStyle["card-body"]}>
        <div className={listingStyle["d-flex"] + " " + listingStyle["flex-1"]}>
          <div className={listingStyle["thumbnail-img"]}>
            <img src={flightThumbnails[al]} alt="" />
          </div>
          <div className={listingStyle["flight-name"]}>{flightCodes?.[al]}</div>
        </div>
        <div
          className={
            listingStyle["d-flex"] +
            " " +
            listingStyle["flex-3"] +
            " " +
            listingStyle["timeline"]
          }
        >
          <div className={listingStyle["duration"]}>
            <span>{dt}</span>
            <span className={listingStyle["total-time"]}>
              {hours}h {minutes}m
            </span>
            <span>{at}</span>
          </div>
          <div className={listingStyle["route"]}>
            <span>{fr}</span>
            <span className={listingStyle["dotted-line"]}></span>
            <span>{to}</span>
          </div>
        </div>
        <div className={listingStyle["d-flex"] + " " + listingStyle["flex-1"]}>
          <div>
            <img
              src="https://d2mccptxtk231d.cloudfront.net/v2_d_app/327/dist/0983487e8994fb93be21.svg"
              alt=""
            />
          </div>
          <div className={listingStyle["fare-amt"]}>₹ {farepr}</div>
        </div>
        <div className={listingStyle["d-flex"] + " " + listingStyle["flex-1"]}>
          <button className={listingStyle["booking-btn"]}>Book</button>
          <div className={listingStyle["more-actions"]}>
            <img
              src="https://d2mccptxtk231d.cloudfront.net/v2_d_app/327/dist/6e7267b78e3464145a49.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className={listingStyle["card-footer"]}></div>
    </div>
  );
}
