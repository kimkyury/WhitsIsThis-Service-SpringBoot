import React from 'react';
import picture from './pic.jpg'
function Myinfo() {
  const consumer = '홍길동'
  const Pnumber = '010-0000-0000'
  const id = 'qwer1234'
  const number = '1234567'
  return (
    <div style={{width:'800px', boxShadow:'2px 3px 3px rgba(0, 0, 0, 0.5)', borderRadius:'8px'}}>  
      <p style={{color:'#2D4059',marginTop:'7%', marginLeft:'10%',fontWeight:'bold', fontSize:'25px'}}>내 정보</p>
      <div className='gridbox' style={{marginLeft: '10%', borderRadius:'8px', border:'3px solid black', width:'500px', height:'100px'}}>

        {/* <span style={{borderRadius:'100%', border:'2px solid black', height: '10vh', width: '10vw' }}></span> */}
        
        <img style={{marginTop:'5%', marginLeft:'5%', border:'2px solid black', borderRadius:'100%', width:'70px', height:'70px'}} src={picture}/>
        <div>
        <p ><span>{consumer}</span><button>실명수정</button></p>
        <p><span>{Pnumber}</span><button>수정</button></p>

        </div>
      </div>

    <div>
    <p style={{color:'#2D4059', marginLeft:'10%',fontWeight:'bold', fontSize:'25px'}}>기본정보</p>
      <div style={{marginLeft: '10%', borderRadius:'8px', border:'3px solid black', width:'500px', height:'100px'}}>
        
      <div>
        <span>{id}</span><button>수정</button>
        </div>
        <div>
        <span>사번 : {number}</span><span>역할 : 직원</span>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Myinfo;