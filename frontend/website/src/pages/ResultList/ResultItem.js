import React from 'react';
import './ResultList.css';
export function ResultItem({data}) {
  return (
    <div style={{ marginTop: '3%', display: 'flex', justifyContent: 'center' }}>
      <p           
        style={{  width: '90vw',
        height: '5vh',
        display: 'flex',
        justifyContent: 'flex-start',
        textAlign: 'start',
        height: '100%',
        marginTop:'-3%'
      }}
      >
        <span style={{marginLeft:'1%', width: '13vw'}} className='databox'>{data.consumer}</span>
        <span style={{marginLeft:'0vw', width: '13vw'}} className='databox'>{data.phonenumber}</span>
        <span style={{marginLeft:'5vw', width:'35vw'}} className='databox'>{data.address}</span>
        <span style={{width:'13vw'}} className='databox'>{data.finishdate}</span>
      </p>
    </div>
  )
}