import React from "react";
import CustomreceiveModal from "../../customcomponent/customReceive/CustomreceiveModal";
import Receivesuc from "../../customcomponent/customReceive/receivesuccess";
import Address from "../../customcomponent/addresscomp/address";
import './Customreceivepage.css'
// import Calendar from "../../component/calendar/calendar";
function Customreceive() {
  return (
    <div>
      신청페이지
      <div className="modalbox roomimg">
      <CustomreceiveModal/>
      {/* <Receivesuc/> */}
      {/* <Address/> */}
      </div>
    </div>
  )
}

export default Customreceive;