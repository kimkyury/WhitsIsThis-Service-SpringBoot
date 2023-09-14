import React from 'react';
import './ResultList.css';

export function ResultItem({ data, onItemDoubleClick }) {
  const handleDoubleClick = () => {
    onItemDoubleClick(data);
  };

  return (
    <div
      style={{
        width: '70vw',
        height: '5vh',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '0.7%',
        paddingLeft: '1%',
        paddingRight:'1%',
        paddingBottom:'0.7%',
        cursor:'pointer',
        
        marginLeft: '-1%',
      }}
      className='relist'
      onDoubleClick={handleDoubleClick}
    >
      <span style={{flex: '1', width:'10vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='databox'>
        {data.consumer}
      </span>
      <span style={{flex: '1', width: '10vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='databox'>
        {data.phonenumber}
      </span>
      <span style={{flex: '3', width: '40vw', display: 'flex',alignItems: 'center' }} className='databox'>
        {data.address}
      </span>
      <span style={{  flex: '1', width:'10vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='databox'>
        {data.finishdate}
      </span>
    </div>
  );
}
