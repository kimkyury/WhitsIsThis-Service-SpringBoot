import React from "react";
import './Moneyreturn.css';
import Rule from "../../../customcomponent/moneyreturnrule/moneyreturnrule";
import { BiErrorCircle } from "react-icons/bi";
function Moneyreturn() {
  return (
    <div className="roomimg resrecpage backgr">
    <div className="customreceivedivm">
    
    <div className="custommodaltitle ">
      <p>환불페이지</p>
    </div>
    <div className="middlemodals">
      <div>
      <p className="minititles">예금주명</p>
        <input style={{width:'70vw', height:'4.6vh'}} className="inputs" placeholder="이름을 입력해주십시오."/>
      <div className="customgrids">
      <p className="minititles">은행명</p>
      <p>계좌명</p>
      </div>
      <p className="minititles">환불계좌</p>
        <input style={{width:'70vw', height:'4.6vh'}} className="inputs" placeholder="계좌번호를 입력해주십시오."/>

      <p className="minititles">예상 환불금액</p> 
      <p className="inputs" style={{textAlign:'end', paddingRight:'2%'}}>환불금액들어갈곳 <BiErrorCircle/></p>

      </div>
      </div>
      <div className='middlemodalreturn'>
        <button className="button bigbutton">환불신청 </button>
        
      </div>
      <Rule/>
      </div>
  </div>
  )
}

export default Moneyreturn;