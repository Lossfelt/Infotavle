import { useEffect, useState } from "react";

const Clock = ({ className = "" }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`text-5xl font-bold text-white ${className}`.trim()}>
      {time.toLocaleTimeString("no-NO")}
    </div>
  );
};

export default Clock;
