import React, { useEffect, useState } from "react";
import AuthHttp from "../../component/util/AuthHttp";
import {
  Font,
  Image,
  View,
  Document,
  Page,
  StyleSheet,
  Text,
  PDFViewer,
} from "@react-pdf/renderer";
import { useBlob, BlobProvider } from "@react-pdf/renderer";

import axios from 'axios';
Font.register({
  family: "MyKoreanFont",
  src: `${process.env.PUBLIC_URL}/assets/fonts/JeonjuCraft_Go_Regular.ttf`,
});

const MyDocument = ({ data, showUp, setShowUp }) => {
  const [myData, setMydata] = useState();
  const componentRef = React.createRef();
  
  useEffect(() => {
    const fetchMyData = async () => {
      if (!data) return;
      try {
        const response = await AuthHttp({
          method: "get",
          url: `/private/histories/${data.data.history.id}`,
        });
        setMydata(response.data.data);
        console.log(response.data.data)
      } catch (e) {
        console.error(e);
      }
    };

    fetchMyData();
  }, [data]);

  // renderCheckIcon 함수를 MyDocument 내에서 정의
  const renderCheckIcon = (isChecked) => {
    if (isChecked) {
      return <Text style={{ color: 'green' }}>●</Text>;
    } else {
      return '○';
    }
  };

  // PDF 데이터를 서버로 업로드하는 함수
  const postPDFToServer = async (pdfData) => {
    if (!data) {
        console.error("myData가 정의되지 않았습니다. 데이터를 불러오는 중일 수 있습니다.");
        return;
    }
    console.log(pdfData)

    try {
        const formData = new FormData();
        formData.append("report", new Blob([pdfData], { type: "application/pdf" }), "myDocument.pdf");
        const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/api/v1/private/histories/${data.data.history.id}/report`, 
            formData, 
            {
                headers: {
                    Authorization: sessionStorage.getItem('accessToken')
                }
            }
        );
        alert('업로드가 완료되었습니다!!')
        setShowUp(false)
    } catch (error) {
        console.error("PDF 업로드 중 오류 발생", error);
    }
};
  return (
    <div>
      <BlobProvider document={<MyPdfDocument data={myData} renderCheckIcon={renderCheckIcon} />} >
        {({ blob, url, loading, error }) => {
          if (loading) {
            return <p>PDF 생성 중...</p>;
          }
          if (error) {
            return <p>PDF 생성 오류: {error.message}</p>;
          }
          return (
            <div>
               {showUp && (
              <p>
              <button onClick={() => postPDFToServer(blob)}>PDF 업로드하기</button>
              </p>)}
              {!showUp && (
              <div style={{display:'flex', marginTop:'25vh', justifyContent:'flex-end'}}>
              <a className="download"  href={url} download="myDocument.pdf">
                PDF 다운로드
              </a>
              </div>
              )}
              {/* PDF 업로드 버튼 */}
            </div>
          );
        }}
      </BlobProvider>
      <div style={{ display: 'none' }}>
        <div ref={componentRef}>
          {/* renderCheckIcon 함수를 props로 전달 */}
          <MyPdfDocument data={myData} renderCheckIcon={renderCheckIcon} />
        </div>
      </div>
    </div>
  );
};

const MyPdfDocument = ({ data, renderCheckIcon }) => {
  return (
    // <PDFViewer>
    <Document>
      <Page>
        <View style={{ display: "flex", alignItems: "center", marginTop: "20vh" }}>
          <Image style={styles.images} src={`${process.env.PUBLIC_URL}/assets/logo.png`} />
          <Text style={styles.texts}>이게모징손상보고서</Text>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {data && data.todolist.map((it) => (
            <View style={styles.gridContainer} key={it.roomOrder}>
              <View style={styles.leftColumn}>
                <Text style={styles.title}>
                  {it.roomOrder}. {it.roomName}
                </Text>
              </View>
              <View style={styles.rightColumn}>
                {it.todolist && it.todolist.map((data) => (
                  <View key={data.content} style={{ marginBottom: "1.5vh", marginTop: '3.5vh', marginRight: '2vh' }}>
                    <Text style={styles.textgrid}>{renderCheckIcon(data.isChecked)} {data.content}</Text>
                    <View style={styles.imageContainer}>
                      {data.images && data.images.map((image) => (
                        <Image
                          key={image.imageUrl}
                          style={styles.image}
                          src={`${process.env.REACT_APP_S3_BASE_URL}${image.imageUrl}`}
                        />
                      ))}
                    </View>
                  </View>
                ))}
                <View style={styles.border}>
                  <Text style={styles.text}>기기 손상 정보</Text>
                  <View>
                    {data && data.history && data.history.damaged.map((damage) => (
                      <View>
                        <Image
                          key={damage.id}
                          style={styles.imagede}
                          src={damage.imageUrl}
                        />
                        <Text>{damage.category}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
    // </PDFViewer>
  );
};

const styles = StyleSheet.create({
  document: {
    width: "100%",
    minHeight: "75vh",
    border: '2px solid black',
    overflowY: 'hidden'
  },
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  textgrid: {
    fontFamily: "MyKoreanFont",
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: "10px", flexDirection: 'row',
    width: '100vw'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  border: {
    borderTop: '2px solid black',
    width: '100vw',
    paddingTop: '1vh'
  },
  imageContainers: {
    display: "flex",
    alignItems: "center",
    borderTop: '2px solid black',
  },
  image: {
    width: 150,
    height: 100,
    marginRight: 10,
    marginTop: 10,
  },
  imagede: {
    width: 200,
    height: 150,
    marginRight: '10vw',
    marginTop: 10,
  },
  images: {
    width: 300,
  },
  text: {
    fontFamily: "MyKoreanFont",
  },
  texts: {
    fontFamily: "MyKoreanFont",
    marginTop: "40vh",
    fontWeight: "bold",
  },
  textk: {
    margin: "1vh",
    fontFamily: "MyKoreanFont",
    fontWeight: "bold",
  },
  title: {
    fontFamily: "MyKoreanFont",
    fontSize: "4vw",
    fontWeight: "bold",
  },
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "2px solid black",
    borderTop: "2px solid black",
    marginBottom: "10px",
    padding: "10px",
  },
  leftColumn: {
    width: "25%",
    borderRight: "2px solid black",
    padding: "10px",
  },
  rightColumn: {
    width: "75%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "10px",
  },
  gridItem: {
    width: "33.33%",
    border: "2px solid black",
    padding: "10px",
    boxSizing: "border-box",
  },
});

export default MyDocument;
