import React, { useEffect, useRef, useState } from "react";
import commonStyle from "../../styles/common.module.css";
import searchStyle from "../../styles/searchbar.module.css";
import { generateUniqueID } from "../../utilities/utils/helper";
import { useOutsideClick } from "../../hooks/useOutsideClick";

export default function PassengerDropdownCounter({ data = [] }) {
  const boxRef = useRef();
  const [selectedVal, setSelectedVal] = useState(data);
  const [isActive, setIsActive] = useState(false);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(1);
  const [infant, setInfant] = useState(0);
  const [passenger, setPassenger] = useState(2);
  const [alertMsg, setAlertMsg] = useState("");
  const [errMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setSelectedVal(data[0]);
  }, [data]);

  useEffect(() => {
    if (infant > adult) {
      setErrorMsg("Infants should not exceed adults");
      setInfant(adult);
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      return;
    }

    let totalPassenger = adult + children + infant;
    setPassenger(totalPassenger);
    if (totalPassenger > 6) {
      setAlertMsg(
        "Some airlines do not allow searching for more than 6 passengers at once"
      );
    } else {
      setAlertMsg("");
    }
  }, [adult, children, infant]);

  useOutsideClick(boxRef, () => setIsActive(false));

  const decrementCount = (name) => {
    if (name == "adult" && adult > 0) {
      setAdult(adult - 1);
    } else if (name == "children" && children > 0) {
      setChildren(children - 1);
    } else if (name == "infant" && infant > 0) {
      setInfant(infant - 1);
    }
  };

  const incrementCount = (name) => {
    if (name == "adult") {
      setAdult(adult + 1);
    } else if (name == "children") {
      setChildren(children + 1);
    } else if (name == "infant") {
      setInfant(infant + 1);
    }
  };

  const handleCountChange = (name, value) => {
    if (isNaN(value)) return;

    if (name == "adult") {
      setAdult(value);
    } else if (name == "children") {
      setChildren(value);
    } else if (name == "infant") {
      setInfant(value);
    }
  };

  return (
    <div
      className={
        searchStyle["custom-dropdown"] + " " + commonStyle["custom-dropdown"]
      }
      key={generateUniqueID()}
      ref={boxRef}
    >
      <div
        className={
          searchStyle["dropdown-value"] + " " + commonStyle["dropdown-value"]
        }
        onClick={() => setIsActive(!isActive)}
      >
        <span className={searchStyle["icon"] + " " + commonStyle["icon"]}>
          <img src={selectedVal.img_url} alt="" />
        </span>
        {passenger}&nbsp;
        {selectedVal.value}
        <span
          className={
            isActive
              ? commonStyle["reverse-arrow"]
              : commonStyle["dropdown-arrow"]
          }
        >
          <img
            src="https://d2mccptxtk231d.cloudfront.net/v2_d_app/324/dist/0d4d2725ac6487d70197.svg"
            alt=""
          />
        </span>
      </div>
      <div
        className={
          searchStyle["dropdown-options"] +
          " " +
          commonStyle["dropdown-options"] +
          (isActive ? " " + commonStyle["active"] : "") +
          " " +
          searchStyle["large"]
        }
      >
        <ul>
          {data.length > 0 &&
            data.map((item, index) => (
              <li key={index}>
                <span
                  className={searchStyle["icon"] + " " + commonStyle["icon"]}
                >
                  <img src={item.img_url} alt={item.name} />
                </span>

                <div className={searchStyle["info"]}>
                  <span>{item.value}</span>
                  <span>{item.age}</span>
                </div>

                <div className={searchStyle["count"]}>
                  <span onClick={() => decrementCount(item.name)}>
                    <img
                      src="https://d2mccptxtk231d.cloudfront.net/v2_d_app/327/dist/01c820475e388c0b519c.svg"
                      alt=""
                    />
                  </span>
                  <input
                    className={searchStyle["number"]}
                    name={item.name}
                    type="text"
                    value={
                      item.name == "adult"
                        ? adult
                        : item.name == "children"
                        ? children
                        : infant
                    }
                    onChange={(e) =>
                      handleCountChange(e.target.name, e.target.value)
                    }
                  />
                  <span onClick={() => incrementCount(item.name)}>
                    <img
                      src="https://d2mccptxtk231d.cloudfront.net/v2_d_app/327/dist/ccb6ca3bc1e25866470f.svg"
                      alt=""
                    />
                  </span>
                </div>
              </li>
            ))}
          {alertMsg != "" && (
            <p className={searchStyle["alert-message"]}>{alertMsg}</p>
          )}
          {errMsg != "" && (
            <p className={searchStyle["error-message"]}>{errMsg}</p>
          )}
        </ul>
      </div>
    </div>
  );
}
