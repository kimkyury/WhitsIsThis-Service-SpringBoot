import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Maincustompage from "../src/customerpages/Maincustompage/Maincustompage";
import Customreceivepage from "../src/customerpages/Customreceivepage/Customreceivepage";
import Fixcustom from "../src/customerpages/Customresultpage/Fixcustompage/Fixcustom";
import Moneyreturn from "./customerpages/Customresultpage/Moneyreturnpage/Moneyreturn";
import Receiveresult from "./customerpages/Customresultpage/Receiveresultpage/Receiveresult";
import Resultconfirm from "./customerpages/Customresultpage/resultconfirm/Resultconfirm";
import Information from "./customerpages/Customresultpage/Informationpage/Information";
import Health from "./customerpages/Health.jsx";
import Footer from "../src/customcomponent/customheader/footer";
import WebMainC from "./customerpages/WebMainC";

function App() {
  const BASE_NAME = process.env.REACT_APP_BASE_NAME || "";

  return (
    <div className="fontb">
      <Router>
        <Routes>
          <Route path="/health" element={<Health />} />
        </Routes>
      </Router>

      <Router basename={BASE_NAME}>
 
        <Routes>
          <Route path="/start" element={[<WebMainC />]}/>
          <Route path="/" element={[<Maincustompage />]} />
          <Route path="/customerreceive" element={[<Customreceivepage />]} />
          <Route path="/fixcustom" element={[<Fixcustom />]} />
          <Route path="/moneyreturn" element={[<Moneyreturn />]} />
          {/* <Route path="/moneywait" element={[ <Moneywait />]} /> */}
          <Route path="/receiveresult" element={[<Receiveresult />]} />
          <Route path="/resultconfirm" element={[<Resultconfirm />]} />
          <Route path="/information" element={[<Information />]} />
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
