import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';



function Custom() {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
 
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
        <Text>Hello</Text>
     
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      
      </View>
    </Page>
  </Document>
  )
}
// style={{backgroundImage: `url(${process.env.PUBLIC_URL}/assets/집2.jfif)`, // 배경 이미지 경로 설정
// backgroundSize: 'cover', // 이미지를 화면에 맞게 조절)}}>
// }}
export default Custom;