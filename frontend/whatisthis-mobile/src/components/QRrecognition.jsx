import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const QRrecognition = ({ connect }) => {
  const handleScan = (result, error) => {
    if (!!result) {
      connect(result?.text);
    }

    if (!!error) {
      console.info(error);
    }
  };

  return (
    <>
      <QrReader className="camera_frame" onResult={(result, error) => handleScan(result, error)} />
    </>
  );
};

export default QRrecognition;
