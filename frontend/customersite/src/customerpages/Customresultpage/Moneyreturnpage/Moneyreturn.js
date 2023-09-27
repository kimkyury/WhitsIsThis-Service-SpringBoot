import React from "react";
import './Moneyreturn.css';
import Rule from "../../../customcomponent/moneyreturnrule/moneyreturnrule";
import { BiErrorCircle } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";

function Moneyreturn() {
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minDeviceWidth: 1224 });
    return isDesktop ? children : null;
  };
  
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxDeviceWidth: 1223 });
    return isMobile ? children : null;
  };
  return (
    <div className="roomimg resrecpage backgr">
      <Mobile>
      <div className="customreceivedivm">
        <div className="custommodaltitle">
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
            <p className="inputs" style={{textAlign:'end', paddingRight:'2%'}}>환불금액들어갈곳 <BiErrorCircle style={{width:'3vw', height:'3vw'}}/></p>
          </div>
        </div>
        <div className='middlemodalreturn'>
          <button className="button bigbutton">환불신청</button>
        </div>
        <Rule/>
      </div>
      </Mobile>
      <Desktop>
      <div className="desk-customreceivedivm">
        <div className="custommodaltitle">
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
            <p className="inputs" style={{textAlign:'end', paddingRight:'2%'}}>환불금액들어갈곳 <BiErrorCircle style={{width:'3vw', height:'3vw'}}/></p>
          </div>
        </div>
        <div className='middlemodalreturn'>
          <button className="button bigbutton">환불신청</button>
        </div>
        <Rule/>
      </div>
      </Desktop>
    </div>
  )
}

export default Moneyreturn;
