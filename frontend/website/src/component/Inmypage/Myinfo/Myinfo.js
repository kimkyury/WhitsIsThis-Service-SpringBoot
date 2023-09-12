import React from 'react';
import picture from './pic.jpg'
import './info.css'
function Myinfo() {
  const consumer = '홍길동'
  const Pnumber = '010-0000-0000'
  const id = 'qwer1234'
  const number = '1234567'
  return (
    <div style={{width:'800px', boxShadow:'2px 3px 3px rgba(0, 0, 0, 0.5)', borderRadius:'8px'}}>  
      <p style={{color:'#2D4059', marginLeft:'10%',fontWeight:'bold', fontSize:'25px'}}>내 정보</p>
      <div className='gridboxss' style={{marginLeft: '10%', borderRadius:'8px', border:'3px solid black', width:'596px', height:'136px', alignItems:'center'}}>

        {/* <span style={{borderRadius:'100%', border:'2px solid black', height: '10vh', width: '10vw' }}></span> */}

        <img style={{marginLeft:'5%', borderRadius:'100%', width:'100px', height:'100px'}} src={picture}/>
       <div>
        <p style={{fontSize:'25px', fontWeight:'bold', display:'flex', justifyContent:'space-between', marginRight: '10px', alignItems:'center'}}><span>{consumer}</span><button style={{fontSize:'15px', boxShadow:'0px 2px 0px rgba(0, 0, 0, 0.3)', width:'100px', height:'30px', fontWeight:'Bold', backgroundColor:'#ECF0F3', border:'none', borderRadius:'8px', color:'#2D4059'}}>실명수정</button></p>

        <p style={{fontSize:'25px', fontWeight:'bold',display:'flex', justifyContent:'space-between', marginRight: '10px', alignItems:'center'}}><span>{Pnumber}</span><button style={{fontSize:'15px', boxShadow:'0px 2px 0px rgba(0, 0, 0, 0.3)',width:'100px', height:'30px', fontWeight:'Bold', backgroundColor:'#ECF0F3',border:'none', borderRadius:'8px', color:'#2D4059'}}>수정</button></p>
        

        </div>
      </div>

    <div>
    <p style={{color:'#2D4059', marginLeft:'10%',fontWeight:'bold', fontSize:'25px'}}>기본정보</p>
      <div style={{marginLeft: '10%', borderRadius:'8px', border:'3px solid black', width:'596px', height:'136px'}}>
        
      <div style={{marginLeft: '5%', marginRight:'5%'}}>
      <p style={{fontSize:'25px', fontWeight:'bold', display:'flex', justifyContent:'space-between', marginRight: '10px', alignItems:'center'}}><span>{id}</span><button style={{fontSize:'15px', boxShadow:'0px 2px 0px rgba(0, 0, 0, 0.3)', width:'100px', height:'30px', fontWeight:'Bold', backgroundColor:'#ECF0F3', border:'none', borderRadius:'8px', color:'#2D4059'}}>수정</button></p>
        </div>
        <div style={{marginLeft:'5%', fontSize:'25px', fontWeight:'bold', display:'flex', justifyContent:'space-between', marginRight: '10px', alignItems:'center'}}>
        <span>사번 : {number}</span><span style={{marginRight:'5%'}}>역할 : 직원</span>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Myinfo;