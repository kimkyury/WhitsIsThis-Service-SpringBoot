import React from 'react';
import './ResultList.css'
function ResultList() {
  return (
    <div>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
      <input style={{marginTop:'1%',marginRight:'5%',borderRadius:'0.3vw', textAlign:'center'}}/>
      </div>
      <div style={{marginTop:'3%', display:'flex', justifyContent:'center'}}>
        <div style={{ paddingTop: '1%', paddingBottom:'1%', borderBottom:'solid 0.01vw black',borderTop:'solid 0.15vw black', width: '90vw', height: '5vh', display: 'flex', justifyContent: 'space-between', textAlign: 'start', height: '100%' }}>
          
          <span style={{ flex: '1', marginLeft: '2%' }} className='listtitle'>신청자명</span>
          <span style={{ flex: '1',marginLeft: '-10%'  }} className='listtitle'>연락처</span>
          <span style={{ flex: '1',marginLeft: '-10%'  }} className='listtitle'>주소</span>
          <span style={{ flex: '1',marginLeft: '2%'  }} className='listtitle'>점검완료일자</span>
        </div>
        {/* <hr style={{ width: '80vw' }} /> */}
        
      </div>
      {/* div태그에 5줄 리스트 만들기 */}
      <div style={{display:'flex', justifyContent:'center'}}>
      <div style={{borderBottom:'0.01vw solid black', width:'80vw', height:'60vh'}}>
        {/* result item들들어올것 */}
      </div>
      </div>
    </div>
  )
}

export default ResultList;

//신청자명 => requester_name
//연락처 => requester_phone
//주소 => address + address_detail
//담당자 명 => employee_id => id 
//점검완료 일자 => inspection_end
