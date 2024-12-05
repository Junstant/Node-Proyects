import React, { useState, useRef, useEffect } from "react";
import handleVerifyEmail from "./verifyEmail.js";
import { CheckCircle, Warning } from "@phosphor-icons/react";
import Header from "../../components/layouts/Header";
import lightOne from "../../assets/images/lights/loginRegister/Vector.png";
import lightTwo from "../../assets/images/lights/loginRegister/Vector-1.png";
import lightThree from "../../assets/images/lights/loginRegister/Vector-2.png";
import lightFour from "../../assets/images/lights/loginRegister/Vector-3.png";
import lightFive from "../../assets/images/lights/loginRegister/Vector-4.png";
import lightSix from "../../assets/images/lights/loginRegister/Vector-5.png";
import lineDecor from "../../assets/images/lineDecor.svg";
import userPanel from "../../assets/images/userPanel.png";
import panelsOne from "../../assets/images/lights/loginRegister/panels/panelsOne.png";
import panelsTwo from "../../assets/images/lights/loginRegister/panels/panelsTwo.png";
import panelsThree from "../../assets/images/lights/loginRegister/panels/panelsThree.png";
import "../../assets/styles/global.css";
import "../../assets/styles/verifyEmail.css";
import { useParams, useNavigate } from "react-router-dom";

// ? -------- Verify Email component --------->
const VerifyEmail = () => {
  // # -> States to manage form errors
  const { token } = useParams();

  // # -> Function to navigate to another page
  const navigate = useNavigate();

  // # -> Error state
  const [error, setError] = useState(null);

  // # -> Ref for the user panel image
  const imageRef = useRef(null);

  // # -> Function to handle mouse move on the user panel
  const handleMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * -5;

    imageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    imageRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  //Verify email when the component is mounted
  useEffect(() => {
    handleVerifyEmail(token, setError, navigate);
  }, []);

  // ? ------------------ Verify Email component ------->
  return (
    <main>
      <Header></Header>
      <section className="heroVerify">
        <div className="leftContainer">
          {/* ------------------ Success --------------- */}
          {error && error.success != null ? (
            <>
              <CheckCircle size={90} weight="fill" className="text-primary" />
              <p className="text-quaternary mb-7">Redirecting...</p>
              <h2 className="text-3xl text-primary uppercase tracking-widest">{error.success}</h2>
            </>
          ) : null}

          {/* ------------------ Error --------------- */}
          {error && error.general != null ? (
            <>
              <Warning size={90} weight="fill" className="text-primary" />
              <p className="text-quaternary">An error has occurred</p>
              <p className="text-quaternary mb-7">Redirecting...</p>
              <h2 className="text-3xl text-primary uppercase tracking-widest">{error.general}</h2>
            </>
          ) : null}

          {/* ------------------ Verifying --------------- */}
          {!error || (error.success == null && error.general == null) ? <h2 className="text-3xl text-primary uppercase tracking-widest">Verifying your email...</h2> : null}
        </div>
        <div className="illustration overflow-hidden p-11" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <img src={userPanel} alt="userPanel" className="tilt-image" ref={imageRef} />
        </div>
        <div className="lights overflow-hidden">
          <img src={lightOne} alt="lightOne" className="lightOne" />
          <img src={lightTwo} alt="lightTwo" className="lightTwo" />
          <img src={lightThree} alt="lightThree" className="lightThree" />
          <img src={lightFour} alt="lightFour" className="lightFour" />
          <img src={lightFive} alt="lightFive" className="lightFive" />
          <img src={lightSix} alt="lightSix" className="lightSix" />
          <img src={lineDecor} alt="lineDecor" className="lineDecor" />
          <img src={panelsOne} alt="panelsOne" className="panelsOne" />
          <img src={panelsTwo} alt="panelsTwo" className="panelsTwo" />
          <img src={panelsThree} alt="panelsThree" className="panelsThree" />
        </div>
      </section>
    </main>
  );
};

export default VerifyEmail;
