import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './calendar.css';

<<<<<<< HEAD:frontend/customersite/src/customcomponent/calendar/calendar.js
function Calendar({startDate, endDate, dateRange, setDateRange}) {


  
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
=======
function Calendar({ insdate, selectedDatemax, selectdate, setInsdate }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const originalDate = new Date(selectedDate);
  
  // 연도, 월, 일 추출
  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
  const day = originalDate.getDate().toString().padStart(2, '0');
  
  // 포맷팅된 날짜 생성
  const formattedDates = `${year}-${month}-${day}`;
  useEffect(() => {
    // formattedDates가 변경될 때마다 insdate 상태를 업데이트합니다.
    setInsdate(formattedDates);
  }, [formattedDates]);
  // const originalDateString = "Thu Oct 26 2023 00:00:00 GMT+0900 (한국 표준시)";
  // Date 객체 생성
  
  
  
  // 초기 선택된 날짜를 설정합니다.
  
      const formattedDate = new Date(selectedDatemax[0], selectedDatemax[1] - 1, selectedDatemax[2]+1);
  
        // 원하는 형식으로 포맷팅 ('YYYY-MM-DD' 형식)
        const formattedDateString = formattedDate.toISOString().split('T')[0];
        const formattedDatey = new Date(selectdate[0], selectdate[1] - 1, selectdate[2]+1);
        
        // 원하는 형식으로 포맷팅 ('YYYY-MM-DD' 형식)
        const formattedDateStringy = formattedDatey.toISOString().split('T')[0];
        // 적절한 Date 객체 생성
        const selectDate = new Date(formattedDateStringy);
        const selectedDateMax = new Date(formattedDateString);
        console.log(selectdate)
        // console.log(formattedDateString)
        console.log(formattedDateStringy)
        console.log(selectedDate)
        const handleDateChange = (date) => {
          setSelectedDate(date); // 선택한 날짜를 상태에 업데이트합니다.
          console.log("Selected Date:", date);
          console.log("Insdate:", formattedDates);
          console.log("Insdate:", insdate);

          // onDateSelect(date); // 선택한 날짜를 부모 컴포넌트로 전달합니다.
        };
        
        console.log(formattedDates)
        
        return (
          <div style={{ marginTop: '2%', display: 'flex', justifyContent: 'center' }}>
      <DatePicker
        dateFormat="yyyy.MM.dd"
        shouldCloseOnSelect
        minDate={selectDate}
        maxDate={selectedDateMax} // selectDate 이후로 선택 가능
        selected={selectedDate} // 선택된 날짜를 표시
        onChange={handleDateChange}
        placeholderText="날짜를 선택해주세요" 
        withPortal
        className="datePicker"
>>>>>>> frontend/web/website/release:frontend/website/src/component/calendar/calendar.js
      />
    </div>
  );
}

export default Calendar;
