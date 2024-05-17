import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes = [] }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          src={imageUrl}
          alt="faceRecognition"
          width="500px"
          height="auto"
        />
        {boxes.map((box) => {
          return (
            <div
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
              className="boundingBox"
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
