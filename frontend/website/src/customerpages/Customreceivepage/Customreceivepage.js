import React from "react";
import CustomreceiveModal from "../../customcomponent/customReceive/CustomreceiveModal";
import './Customreceivepage.css'
// import Calendar from "../../component/calendar/calendar";
function Customreceive() {
  return (
    <div>
      신청페이지
      <div className="modalbox roomimg">
      <CustomreceiveModal/>
      </div>
    </div>
  )
}

export default Customreceive;