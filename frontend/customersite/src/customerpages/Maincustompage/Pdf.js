import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './custom';
import './Maincustompage.css'
const Pdf = () => (
  <PDFViewer style={{ width: '100%', height: '800px' }}>
    <MyDocument className='pagesize' />
  </PDFViewer>
);

ReactDOM.render(<Pdf />, document.getElementById('root'));

export default Pdf;