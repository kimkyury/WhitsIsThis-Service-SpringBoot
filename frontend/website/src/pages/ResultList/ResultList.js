import React from 'react';

function ResultList() {
  return (
    <div>
      결과내역
      <hr />
      <div style={{display:'flex', justifyContent:'center'}}>
        <div style={{ paddingTop: '1%', paddingBottom:'1%', borderBottom:'solid 2px black',borderTop:'solid 2px black', width: '80vw', height: '5vh', display: 'flex', justifyContent: 'space-between', textAlign: 'start', height: '100%' }}>
          
          <span style={{ flex: '1', marginLeft: '2%' }}>신청자명</span>
          <span style={{ flex: '1',marginLeft: '-10%'  }}>연락처</span>
          <span style={{ flex: '1',marginLeft: '-10%'  }}>주소</span>
          <span style={{ flex: '1',marginLeft: '2%'  }}>점검완료일자</span>
        </div>
        {/* <hr style={{ width: '80vw' }} /> */}
        
      </div>
      {/* div태그에 5줄 리스트 만들기 */}
      <div style={{display:'flex', justifyContent:'center'}}>
      <div style={{borderBottom:'2px solid black', width:'80vw', height:'60vh'}}>
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
