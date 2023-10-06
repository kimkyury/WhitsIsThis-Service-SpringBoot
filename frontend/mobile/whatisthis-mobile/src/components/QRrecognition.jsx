import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const QRrecognition = ({ connect }) => {
  const handleScan = (result, error) => {
    if (!!result) {
      // 시리얼 넘버 형식이 아닐 경우 리턴하는 로직

      connect(result?.text);
    }

    if (!!error) {
      // console.info(error);
    }
  };
  return (
    <>
      <QrReader
        className="camera_frame"
        onResult={(result, error) => handleScan(result, error)}
        videoStyle={{ facingMode: "environment" }}
      />
    </>
  );
};

export default QRrecognition;
