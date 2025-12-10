import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <div className="text-6xl font-bold text-white mb-2">{time.toLocaleTimeString("no-NO")}</div>;
};

export default Clock;
