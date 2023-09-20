import React, {useState, useContext} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import './calendar.css'

function Calendar() {


  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <div style={{marginTop:'2%', display:'flex', justifyContent:'center'}}>
      <DatePicker 
      dateFormat='yyyy.MM.dd' // 날짜 형태
      shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
      minDate={new Date()} // minDate 이전 날짜 선택 불가
       // maxDate 이후 날짜 선택 불가
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update)
      }}

      withPortal
      className='datePicker'
      />
      
    </div>
  )
}

export default Calendar;