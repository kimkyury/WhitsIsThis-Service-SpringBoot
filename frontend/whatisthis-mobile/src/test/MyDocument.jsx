import React, { useEffect, useState } from "react";
import AuthHttp from "../utils/AuthHttp";
import {
  Font,
  Image,
  View,
  PDFViewer,
  Document,
  Page,
  StyleSheet,
  Text,
} from "@react-pdf/renderer";

Font.register({
  family: "MyKoreanFont",
  src: `${process.env.PUBLIC_URL}/assets/fonts/JeonjuCraft_Go_Regular.ttf`,
});

const MyDocument = () => {
  const [myData, setMydata] = useState();

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const response = await AuthHttp({
          method: "get",
          url: `/private/histories/1`,
        });
        console.log(response);
        setMydata(response.data.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchMyData();
  }, []);

  const renderCheckIcon = (isChecked) => {
    if (isChecked) {
      // 아이콘 컴포넌트를 JSX로 렌더링합니다.
      return <Text style={{ color: "green" }}>●</Text>;
    } else {
      console.log("Not rendering checkmark icon.");
      return "○";
    }
  };

  return (
    <div className="conatiner">
      <PDFViewer style={styles.document}>
        <Document>
          <Page scale={1.5}>
            <View style={{ display: "flex", alignItems: "center", marginTop: "20vh" }}>
              <Image style={styles.images} src={`${process.env.PUBLIC_URL}/assets/logo_blue.png`} />
              <Text style={styles.texts}>담당자명 : 홍길동</Text>
              <Text style={styles.textk}>점검완료일자 : 2023-10-04</Text>
            </View>
          </Page>
          <Page size="A4" style={styles.page} scale={1.5}>
            <View style={styles.section}>
              {myData &&
                myData.todolist.map((it) => (
                  <View style={styles.gridContainer} key={it.roomOrder}>
                    <View style={styles.leftColumn}>
                      <Text style={styles.title}>
                        {it.roomOrder}. {it.roomName}
                      </Text>
                    </View>
                    <View style={styles.rightColumn}>
                      {it.todolist &&
                        it.todolist.map((data) => (
                          <View
                            key={data.content}
                            style={{
                              marginBottom: "1.5vh",
                              marginTop: "3.5vh",
                              marginRight: "2vh",
                            }}
                          >
                            <Text style={styles.textgrid}>
                              {renderCheckIcon(data.isChecked)} {data.content}
                            </Text>

                            <View style={styles.imageContainer}>
                              {data.images &&
                                data.images.map((image) => (
                                  <Image
                                    key={image.imageUrl}
                                    style={styles.image}
                                    src={`${process.env.REACT_APP_S3_BASE_URL}${image.imageUrl}`}
                                  />
                                ))}
                            </View>
                          </View>
                        ))}
                    </View>
                  </View>
                ))}
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

const styles = StyleSheet.create({
  document: {
    width: "100%",
    minHeight: "80vh",
  },
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  textgrid: {
    fontFamily: "MyKoreanFont",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    flexDirection: "row",
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
  image: {
    width: 150,
    height: 100,
    marginRight: 10,
    marginTop: 10,
  },
  images: {
    width: 300,
  },
  text: {
    fontFamily: "MyKoreanFont",
    // margin:'5vh',
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
