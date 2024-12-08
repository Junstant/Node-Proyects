import React, { useState, useEffect } from "react";
import getFormattedDate from "../../utils/actualDate.js";
import { CalendarDots } from "@phosphor-icons/react";

// ? ------------------ CurrentTime Component ------->
const CurrentTime = () => {
  const [time, setTime] = useState(getFormattedDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedDate());
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  // ? ------------------ CurrentTime Component ------->
  return (
    <div className="w-full flex flex-row items-center justify-center gap-2">
      <CalendarDots className="text-primary" size={32} />
      <p className="text-xs">{time}</p>
    </div>
  );
};

export default CurrentTime;
