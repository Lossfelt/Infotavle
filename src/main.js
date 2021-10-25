import React from "react";
import Rutetider from "./rutetider.js";

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
              src="https://www.yr.no/nb/innhold/1-72837/meteogram.svg"
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
