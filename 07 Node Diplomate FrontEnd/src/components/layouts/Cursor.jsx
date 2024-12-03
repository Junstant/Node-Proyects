import React, { useEffect } from "react";
import "../../assets/styles/cursor.css";

const CustomCursor = () => {
  useEffect(() => {
    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;

      cursorOutline.style.left = `${mouseX}px`;
      cursorOutline.style.top = `${mouseY}px`;

      cursorOutline.animate(
        {
          left: `${mouseX}px`,
          top: `${mouseY}px`,
        },
        { duration: 700, fill: "forwards" } 
      );
    };

    document.addEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div className="cursorDot" data-cursor-dot></div>
      <div className="cursorOutline" data-cursor-outline></div>
    </>
  );
};

export default CustomCursor;
