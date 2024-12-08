import React, { useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { CalendarDot } from "@phosphor-icons/react";
import dayjs from "dayjs";
import useUserStore from "../../../../stores/userStore";

const ModuleTimeBlock = () => {
  const { activeModule, activeYear } = useUserStore();

  // Calculate the next ten days
  const getNextTenDays = () => {
    const days = [];
    for (let i = 0; i < 10; i++) {
      const date = dayjs().add(i, "day");
      const dayOfWeek = date.format("dddd");
      const formattedDate = date.format("DD MMM");
      days.push({ date, dayOfWeek, formattedDate });
    }
    return days;
  };

  //^ ----> Scroll functionality
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollContainerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);

    document.body.classList.add("no-select");
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.classList.remove("no-select");
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX - scrollContainerRef.current.offsetLeft;
    const scroll = (x - startX) * 2; // Adjust the speed of scroll
    scrollContainerRef.current.scrollLeft = scrollLeft - scroll;
  };

  const nextTenDays = getNextTenDays();

  return (
    <section
      ref={scrollContainerRef}
      className="flex flex-row gap-3 border p-4 mt-2 text-quaternary rounded-xl overflow-x-scroll w-full items-center justify-start"
      style={{ borderColor: activeModule.color, WebkitScrollbar: "none", scrollbarWidth: "none" }}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onWheel={(e) => {
        scrollContainerRef.current.scrollLeft += e.deltaY * 0.2;
      }}
    >
      {nextTenDays.map((day, index) => {
        // Search for the schedule of the day
        const matchingSchedule = activeModule.schedule.find((sched) => sched.days.some((d) => d.name === day.dayOfWeek));

        return (
          <div className="h-32 min-w-32 flex flex-col gap-1 border border-quaternary rounded-lg p-2 items-center justify-between cursor-move" key={index}>
            {/* Year */}
            <div className="w-full justify-start flex flex-row items-center gap-1">
              <CalendarDot size={20} />
              <Typography fontSize={10}>{activeYear?.name}</Typography>
            </div>

            {/* Date */}
            <h6 className="text-xl mt-2 text-white leading-none text-center pointer-events-none">
              {day.formattedDate}
              <Typography variant="body2" color={activeModule.color}>
                {day.dayOfWeek}
              </Typography>
            </h6>

            {/* Schedule */}
            {matchingSchedule ? (
              <Box textAlign="center">
                {matchingSchedule.days.map((sched, i) => (
                  <Typography key={i} fontSize={12}>
                    {sched.fromHr} - {sched.toHr}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography fontSize={12}>No class</Typography>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ModuleTimeBlock;
