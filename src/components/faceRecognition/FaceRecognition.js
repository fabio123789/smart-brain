import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
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
        <div
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
          className="boundingBox"
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
