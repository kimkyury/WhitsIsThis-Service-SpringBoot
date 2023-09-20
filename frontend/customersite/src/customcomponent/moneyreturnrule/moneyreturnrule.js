
import React from "react";
import './rule.css';
function Rule() {
  return (
    <div  style={{display:'flex', justifyContent:'end', alignItems:'center'}}> 
    <div className="rulebox">
      <li>
      점검 시작일 기준 7일 전에 환불 100%
      </li>
      <li>
      점검 시작일 기준 3일 전에 환불 70%
      </li>
      <li>
      점검 시작일 기준 1일 전에 환불 50%
      </li>
      <li>
      점검 시작일 기준 24시간 이내 환불불가
      </li>
    </div>
    </div>
  )
}

export default Rule;