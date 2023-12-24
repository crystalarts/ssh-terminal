import React from "react";

function Background() {
  return (
    <>
      <div className="stars">
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </div>
      <div className="circle-container">
        <div className="circle top-left"></div>
        <div className="circle middle-right"></div>
        <div className="circle middle-center-right"></div>
        <div className="circle middle-center"></div>
        <div className="circle middle-center-top-right"></div>
        <div className="circle middle-center-bottom-right"></div>
      </div>
    </>
  );
}

export default Background;
