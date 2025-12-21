import { useState, useEffect } from "react";
import config from "../config";

const Meteogram = ({ onClick }) => {
  const [refreshKey, setRefreshKey] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(Date.now());
    }, config.refetchIntervals.meteogram);

    return () => clearInterval(interval);
  }, []);

  return (
    <button onClick={onClick} className="w-full h-full cursor-pointer focus:outline-none block">
      <img
        key={refreshKey}
        src={`${config.urls.yrMeteogram}?t=${refreshKey}`}
        alt="Meteogram"
        className="absolute -bottom-3 w-full h-[72vh] left-0 right-0"
      />
    </button>
  );
};

export default Meteogram;
