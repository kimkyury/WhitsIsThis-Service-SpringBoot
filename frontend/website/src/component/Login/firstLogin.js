import React from "react";
import './Login.css';
function firstLogin() {
  return (
    <div className="infocha">
      <div className="infoin">
        <div className="infogridx">
          <div>
        <img className='infoimg' style={{border:'2px solid black'}} />
        
        <span className="infofirtitle">홍길동</span>
        </div>

          <div style={{
            marginTop:'6.9rem',
            display:'flex', 
          justifyContent:'space-between'
          }}>
            <p style={{
              fontSize:'1.3rem',
              fontWeight:'bold',
            }}>아이디 : Qwer1234</p>
          <button style={{fontWeight:'bold',color:'white', borderRadius:'0.6rem', backgroundColor:'#2D4059', height:'2rem', marginTop:'1.2rem', marginRight:'0.8rem'}}>수정</button></div>
        </div>
       
        <div >
         
        </div>
        <div className='passtagboxx'>
          연락처
           <p>
        <input className='detailpassboxs' placeholder='연락처를 입력해주시오.' /></p>
        비밀번호 변경
      </div>

      <div>
        <input style={{ marginTop: '2rem'}} className='detailpassboxx' placeholder='현재 비밀번호' />
        <p>
          <input style={{marginTop: '1rem'}} className='detailpassboxx' placeholder='새 비밀번호' />
          <input style={{marginTop: '1rem'}} className='detailpassboxx' placeholder='새 비밀번호 확인' />
        </p>
      </div>

      <div style={{ marginTop:'1rem', display: 'flex', justifyContent: 'center' }}>
        <button className='Changeboxx'>변경하기</button>
      </div>
      </div>
      
    </div>
  )
}

export default firstLogin;