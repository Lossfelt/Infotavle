import React from "react";
import Rutetider from "./rutetider.js";
import config from "./config";

function buttonRefreshPage() {
  window.location.reload();
}

function Main() {
  return (
    <div>
      <div className="grid-container">
        <div className="weather">
          <button onClick={buttonRefreshPage}>
            <img
              alt="Meteogram for Oslo"
              src={config.urls.yrMeteogram}
            />
          </button>
        </div>
        <div className="rutetider">
          <Rutetider />
        </div>
      </div>
    </div>
  );
}
export default Main;
