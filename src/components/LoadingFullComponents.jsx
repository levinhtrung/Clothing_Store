import React, { useRef } from "react";
import { ClipLoader } from "react-spinners";

const LoadingFullComponents = ({ children, isLoading, delay = 200 }) => {
  const refLoad = useRef(null);
  const body = document.querySelector("body");

  if (isLoading) {
    body?.classList.add("overflow_hidden");
    refLoad?.current?.classList.add("backGround-Loading");
  } else {
    body.classList.remove("overflow_hidden");
    refLoad?.current?.classList.remove("backGround-Loading");
  }
  return (
    <div ref={refLoad} className="noneLoad">
      <span className="loading-component">
        <ClipLoader
          className="loading"
          color="#36d7b7"
          loading={isLoading}
          size={30}
          delay={delay}
        />
      </span>
      {children}
    </div>
  );
};

export default LoadingFullComponents;
