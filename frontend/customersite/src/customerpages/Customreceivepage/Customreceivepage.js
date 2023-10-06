import React from "react";
import CustomreceiveModal from "../../customcomponent/customReceive/CustomreceiveModal";
import Receivesuc from "../../customcomponent/customReceive/receivesuccess";
import Address from "../../customcomponent/addresscomp/address";
import './Customreceivepage.css'
import Phoneconfirm from "../../customcomponent/customReceive/Phoneconfirm";
import {useMediaQuery} from 'react-responsive';
// import Calendar from "../../component/calendar/calendar";
function Customreceive() {


  return (
    <div>
 
      <div className="modalbox roomimg" >

      <CustomreceiveModal/>
      {/* <Receivesuc/> */}
      {/* <Phoneconfirm/> */}

      </div>
 
    

    </div>
  )
}

export default Customreceive;