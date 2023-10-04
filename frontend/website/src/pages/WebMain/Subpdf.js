import React from "react";

function subPdf() {
  useEffect(() => {
  

    fetchMyData();
    }, []);
    const fetchMyData =  async() => {
      try {
        const response = await AuthHttp({
          method:'get',
          url:`/private/requests/histories/`
        })
        console.log(response.data)
        console.log(response.data.data[0].requests[0])
        setMydata(response.data.data)
        console.log(response.data.data)
        // setMdata(response.data.data.requests)
      } catch(e) {
        console.error(e)
      }
    }
    return (
      <div>

      </div>
    )
}