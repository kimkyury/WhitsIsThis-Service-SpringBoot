import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './calendar.css';

function Calendar({ onDateSelect, selectitem, setShowcal }) {

  const selectDate = selectitem.inspectionStart
  const selectedDate = selectitem.inspectionEnd
  const handleDateChange = (date) => {
    
    onDateSelect(date); // 선택한 날짜를 부모 컴포넌트로 전달합니다
    
  };

  return (
    <div style={{ marginTop: '2%', display: 'flex', justifyContent: 'center' }}>
      <DatePicker
        dateFormat="yyyy.MM.dd"
        shouldCloseOnSelect
        minDate={new Date()}
        selectsRange={true}
        startDate={selectDate}
        endDate={selectedDate}
        onChange={handleDateChange}
        withPortal
        className="datePicker"
      />
    </div>
  );
}

export default Calendar;
