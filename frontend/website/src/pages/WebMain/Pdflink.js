import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from '../WebMain/Pdf'; // 이전 단계에서 작성한 컴포넌트를 가져옵니다.

const PDFLink = ({ data }) => (
  <PDFDownloadLink
    document={<MyDocument data={data} />} // MyDocument 컴포넌트에 데이터를 전달합니다.
    fileName="이게모징보고서.pdf" // 다운로드할 PDF 파일의 이름을 설정합니다.
  >
    {({ blob, url, loading, error }) =>
      loading ? '로딩 중...' : 'PDF 다운로드'
    }
  </PDFDownloadLink>
);

export default PDFLink;