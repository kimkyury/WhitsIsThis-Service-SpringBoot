import React, { useState } from 'react';
import './passbox.css';

function Mypassword() {
  return (
    <div className='passbox'>
      <div className='passtagbox'>
        비밀번호 변경
      </div>

      <div>
        <input style={{ marginTop: '5.7vh'}} className='detailpassbox' placeholder='현재 비밀번호' />
        <p>
          <input style={{marginTop: '6.4vh'}} className='detailpassbox' placeholder='새 비밀번호' />
          <input style={{marginTop: '2.1vh'}} className='detailpassbox' placeholder='새 비밀번호 확인' />
        </p>
      </div>

      <div style={{ marginTop:'15%', display: 'flex', justifyContent: 'center' }}>
        <button className='Changebox'>변경하기</button>
      </div>
    </div>
  )
}

export default Mypassword;
