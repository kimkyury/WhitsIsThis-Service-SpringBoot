import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const Test2 = (props) => {
  const [data, setData] = useState("No result");

  return (
    <>
      <QrReader
        className="container"
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
      />
      <p>{data}</p>
    </>
  );
};

export default Test2;
