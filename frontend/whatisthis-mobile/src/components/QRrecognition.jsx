import React from "react";
import QrReader from "react-qr-scanner";

class QRrecognition extends React.Component {
  state = {
    delay: 100,
    result: "No result",
  };

  handleScan = (data) => {
    this.setState({
      result: data,
    });
  };

  handleError = (err) => {
    console.error(err);
  };

  render() {
    return (
      <div>
        <h1>QRreader</h1>
        <QrReader
          delay={this.state.delay}
          //style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
        />
        <p>here: {this.state.result}</p>
      </div>
    );
  }
}

export default QRrecognition;
