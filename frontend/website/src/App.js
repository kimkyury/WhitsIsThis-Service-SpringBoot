import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebMain from "../src/pages/WebMain/WebMain";
import Header from "../src/component/Header/Header";
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
import WebMains from "../src/pages/WebMain/WebMainC";
import Footer from '../src/component/Header/Footer/footer';
import Pdf from '../src/pages/WebMain/Pdf';
import Calendar from "../src/component/calendar/calendar";
function App() {
  const BASE_NAME = process.env.REACT_APP_BASE_NAME || "";
  const access = sessionStorage.getItem('refreshToken');
  const isAuthenticated = !!access;
// asdf
  return (
    <div className='fontb'>
      <Router basename={BASE_NAME}>
        <div style={{ display: 'flex' }}>
          <Header />
          <Routes>
            <Route path='/his' element={<Pdf/>}/>
          <Route path='/CC' element={<WebMains/>} />
            <Route path='/first' element={<First />} />
            <Route path="/" element={<WebMain />} />
            <Route path="/list" element={<List />} />
            <Route path="/resultlist" element={<ResultList />} />
            <Route path="/request" element={<Request />} />
            <Route path="/rlist" element={<RList />} />
            <Route
              path="/mypage"
              element={<Mypage />}
            />
            <Route
              path="/mypass"
              element={<Mypass />}
            />
          </Routes>
        </div>
      {/* <Footer/> */}
      </Router>
    </div>
  );
}

export default App;
