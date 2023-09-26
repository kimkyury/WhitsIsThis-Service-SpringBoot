import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebMain from "../src/pages/WebMain/WebMain";
import Header from "../src/component/Header/Header";
// import Custom from '../src/customcomponent/customReceiveModal/CustomreceiveModal';
import List from "../src/pages/ReceivedList/ReceivedList";
import ResultList from "../src/pages/ResultList/ResultList";
import Mypage from "../src/pages/Mypage/Mypage";
import Request from "../src/component/calendar/calendar";
import Mypass from "../src/component/Inmypage/Mypassword/Mypassword";
import Health from "./pages/Health.jsx";
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';
import Cookies from 'js-cookie';
import First from "./pages/WebMain/First";
import RList from "./pages/ResultList/ResultLists";
// import PrivateRoute from './components/PrivateRoute';
function App() {
  const BASE_NAME = process.env.REACT_APP_BASE_NAME || "";
  const access = Cookies.get('refreshToken');
  return (
    <div>
      {/* <Router>
        <Routes>
          <Route path="/health" element={<Health />} />
        </Routes>
      </Router> */}

      <Router basename={BASE_NAME}>
        <Routes>
        <Route path='first' element={[<Header/>, <First/>]}/>
        <Route path="/" element={[<Header />, <WebMain />]} />
        <Route path="/list" element={[<Header />, <List/>]} />
        <Route path="/resultlist" element={[<Header />, <ResultList />]} />
        <Route path="/mypage" element={[<Header />, <Mypage />]} />
        <Route path="/request" element={[<Header />, <Request />]} />
        <Route path="/mypass" element={[<Header />, <Mypass />]} />
        <Route path="/rlist" element={[<Header />, <RList />]} />
          {/* <Route path='/WebMain/Custom' element={[<Custom/>]}/> */}
          {/* <Route path="/list" element={<PrivateRoute authenticated={access} component={[<Header />, <List />]}/>} />
          <Route path="/resultlist" element={<PrivateRoute authenticated={access} component={[<Header />, <ResultList />]}/>} />
          <Route path="/mypage" element={<PrivateRoute authenticated={access} component={[<Header />, <Mypage />]}/>} />
          <Route path="/request" element={<PrivateRoute authenticated={access} component={[<Header />, <Request />]}/>} />
          <Route path="/pass" element={<PrivateRoute authenticated={access} component={[<Header />, <Mypass />]}/>} /> */} */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
