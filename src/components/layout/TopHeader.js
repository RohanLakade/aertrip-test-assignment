import React, { useState } from "react";
import headerStyle from "../../styles/header.module.css";
import { headerData } from "../../utilities/utils/masterData";

export default function TopHeader() {
  const [selectedVal, setSelectedVal] = useState(
    headerData?.navigation_menu_options[0]
  );

  return (
    <div className={headerStyle["top-header"]}>
      <div className={headerStyle["left-sec"]}>
        <div className={headerStyle["logo"]}>
          <a href="/">
            <img
              src={headerData.main_logo_url}
              alt="logo"
              width={199}
              height={54}
            />
          </a>
        </div>
      </div>
      <div className={headerStyle["middle-sec"]}>
        <ul>
          {headerData.navigation_menu_options.length > 0 &&
            headerData.navigation_menu_options.map((item) => (
              <li key={item.id}>
                <button
                  className={
                    selectedVal.name == item.name ? headerStyle["selected"] : ""
                  }
                  onClick={() => setSelectedVal(item)}
                >
                  <div className={headerStyle["label"]}>
                    <span className={headerStyle["text"]}>{item.name}</span>
                    <span className={headerStyle["logo"]}>
                      <img src={item.image_url} alt="" />
                    </span>
                  </div>
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className={headerStyle["right-sec"]}>
        <div className={headerStyle["theme-btn"]}>
          <button>
            <img
              src="https://d2mccptxtk231d.cloudfront.net/v2_d_app/324/dist/8d7b4175b089cb7680a2.svg"
              alt=""
              width={30}
              height={30}
            />
          </button>
          <div className={headerStyle["responsive-icons"]}>
            <button>
              <img
                src="https://d2mccptxtk231d.cloudfront.net/v2_d_app/324/dist/b778cb1777612594612f.svg"
                alt="hamburger_icon"
                width={30}
                height={30}
              />
            </button>
            <button>
              <img
                src="https://d2mccptxtk231d.cloudfront.net/v2_d_app/324/dist/c5f62b94b23ef24e5b4c.svg"
                alt="close_icon"
                width={30}
                height={30}
              />
            </button>
          </div>
        </div>
        <div className={headerStyle["login-btn"]}>
          <button>Login</button>
        </div>
      </div>
    </div>
  );
}
