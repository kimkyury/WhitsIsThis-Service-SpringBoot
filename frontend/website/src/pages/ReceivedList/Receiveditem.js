import React, {useState} from 'react';

function Receiveditem() {
  const [consumer, setConsumer] = useState('홍길동');
  const [phonenumber, setPhonenumber] = useState('010-0000-0000')
  const [address, setAddress] = useState('부산광역시 강서구 녹산동 삼정그린코아 101동 103호')
  return (
    <div style={{boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.5)', // 아래쪽 그림자 설정
    // padding: '20px', 
    width:'877.15px',
    height:'172.21px', 
    borderLeft:'5px solid #F07B3F',
    marginTop: '1%',
    marginLeft: '1%',
    backgroundColor: 'white',
    color:'black',
    }} 
    // onClick={{ResultModal}}
    >
      <div style={{display:'flex', justifyContent:'space-between', marginRight:'2%'}}>
      <span style={{marginLeft:'2%', fontSize: '20px', marginTop: '2%'}}>신청자명 : {consumer}</span>
      <span style={{marginLeft:'2%', fontSize: '20px', marginTop: '2%'}}>연락처 : {phonenumber}</span>
      </div>
      <span style={{marginLeft:'2%', fontSize: '20px'}}>주소 : {address}</span>
      
    </div>

  )
}

export default Receiveditem;