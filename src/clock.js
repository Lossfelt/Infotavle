import { useState } from "react";
import React from "react";

const Clock = () => {
  let time = new Date().toLocaleTimeString("no-NO");

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString("no-NO");
    setTime(time);
  };
  setInterval(UpdateTime);
  return <div>{ctime}</div>;
};
export default Clock;
