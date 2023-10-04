import React, { useEffect, useState } from "react";
import AuthHttp from "../../component/util/AuthHttp";
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

// function History() {
//   const [data, setData] = useState('');

//   useEffect(() => {
//     fetchMyData();
//   }, []);

//   const fetchMyData = async () => {
//     const id = 1;

//     try {
//       const response = await AuthHttp({
//         method: 'get',
//         url: `/private/histories/${id}`,
//         params: {
//           id: 1
//         }
//       });
//       console.log(response.data);
//       setData(response.data);
//     } catch(e) {
//       console.error(e);
//     }
//   }

//   // console.log(data);
//   // console.log(data.message)
//   // console.log(data.data.todolist[0].todolist)
//   const styles = StyleSheet.create({
//         page: {
//             textAlign: 'center',
//             margin: 30,
//             fontSize: 30,
//             // border: '2px solid black',
//         },
//         text: {
//             color: '#228b22',
//         },
//       layout: {
//               marginTop: 30,
//               flexDirection: 'row',
//               justifyContent: 'space-between'
//           },
//       image: {
//         width: 300,
//         height: 200,
//       }
//   });
//   console.log(data)
//   return (
//     <PDFViewer>
//     <Document>
//       <Page style={styles.page}>
//         <View>
//           <Text>
//             {data.message}
//           </Text>
//         </View>
//         <View style={styles.layout}>
//         {/* <Text style={styles.text}>Hello</Text>

//         <Image
//         src={`${process.env.PUBLIC_URL}/assets/집1.jpg`}
//         style={styles.image} /> */}
//         </View>

//       </Page>
//     </Document>
//     </PDFViewer>
//   )
// }

// export default History;
// import React from 'react';
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

Font.register({
  family: "MyKoreanFont",
  src: `${process.env.PUBLIC_URL}/assets/fonts/JeonjuCraft_Go_Regular.ttf`,
});
const styles = StyleSheet.create({
  document: {
    width: "100%",
    minHeight: "80vh",
  },
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    // width:'1000'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image: {
    width: 400,
    height: 200,
  },
  text: {
    fontFamily: "MyKoreanFont", // 한글 폰트 적용
  },
});

const MyDocument = ({ data }) => {
  const [myData, setMydata] = useState();

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const response = await AuthHttp({
          method: "get",
          url: `/private/histories/1`,
        });
        console.log(response.data.data);
        setMydata(response.data.data);
        // setMdata(response.data.data.requests)
      } catch (e) {
        console.error(e);
      }
    };
    fetchMyData();
  }, []);

  return (
    <PDFViewer style={styles.document}>
      <Document>
        <Page size="A4" style={styles.page}>
          <Image style={styles.image} src={`${process.env.PUBLIC_URL}/assets/집1.jpg`} />
        </Page>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            {/* <Text style={styles.text}>{data}</Text> */}
            {myData &&
              myData.todolist.map((it) => (
                <View View key={it.roomOrder}>
                  <Text style={styles.text}>
                    {it.roomOrder} {it.roomName}
                  </Text>

                  {it.todolist &&
                    it.todolist.map((data) => (
                      <View key={data.content}>
                        <Text style={styles.text}>{data.content}</Text>
                        <Text style={styles.text}>{data.isChecked}</Text>

                        {data.images &&
                          data.images.map((image) => (
                            <Image
                              key={image.imageUrl}
                              style={styles.image}
                              src={`${process.env.REACT_APP_S3_BASE_URL}${image.imageUrl}`}
                            />
                          ))}
                      </View>
                    ))}
                </View>
              ))}

            {/* {myData&&myData.todolist.map((it)=>{
             {it && it.todolist.map((data) => {
              // console.log(data.isChecked)
              return(
                <Text style={styles.text}>{data.isChecked}</Text>
              )
            })}
          })}
      {myData && myData.todolist.map((it) => {
        return it && it.todolist.map((data) => {
          // console.log(data.images)
          return data.images && data.images.map((image) => {
            // console.log(image.imageUrl);
            return (
              // <Image style={styles.text}>{image.imageUrl}</Image>
              <Image
              style={styles.image}
              src={`${process.env.REACT_APP_S3_BASE_URL}${image.imageUrl}`}
            />
            );
          });
        });
      })} */}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default MyDocument;
