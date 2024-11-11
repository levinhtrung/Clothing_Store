import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingComponents = ({ children, isLoading, delay = 200 }) => {
  return (
    <>
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
    </>
  );
};

export default LoadingComponents;
