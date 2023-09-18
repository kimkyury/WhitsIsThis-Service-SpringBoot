import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebMain from '../src/pages/WebMain/WebMain';
import Header from '../src/component/Header/Header';
// import Custom from '../src/customcomponent/customReceiveModal/CustomreceiveModal';
import List from '../src/pages/ReceivedList/ReceivedList';
import ResultList from '../src/pages/ResultList/ResultList';
import Mypage from '../src/pages/Mypage/Mypage';
import Request from '../src/component/calendar/calendar';
import Mypass from '../src/component/Inmypage/Mypassword/Mypassword';
import Maincustompage from '../src/customerpages/Maincustompage/Maincustompage';
import Customreceivepage from '../src/customerpages/Customreceivepage/Customreceivepage';
import Fixcustom from '../src/customerpages/Customresultpage/Fixcustompage/Fixcustom';
import Moneyreturn from './customerpages/Customresultpage/Moneyreturnpage/Moneyreturn';
import Moneywait from './customerpages/Customresultpage/Moneywaitpage/Moneywait';
import Receiveresult from './customerpages/Customresultpage/Receiveresultpage/Receiveresult';
import Customheader from './customcomponent/customheader/customheader';
import Resultconfirm from './customerpages/Customresultpage/resultconfirm/Resultconfirm';
// import PrivateRoute from './components/PrivateRoute';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/WebMain' element={[<Header/>, <WebMain/>]}/>
          {/* <Route path='/WebMain/Custom' element={[<Custom/>]}/> */}
          <Route path='/WebMain/List' element={[<Header/>, <List/>]}/>
          <Route path='/WebMain/ResultList' element={[<Header/>, <ResultList/>]}/>
          <Route path='/WebMain/Mypage' element={[<Header/>, <Mypage/>]}/>
          <Route path='/WebMain/Request' element={[<Header/>, <Request/>]}/>
          <Route path='/WebMain/pass' element={[<Header/>, <Mypass/>]}/>
          <Route path='/CustomMain' element={[<Customheader/>, <Maincustompage/>]}/>
          <Route path='/CustomMain/Customreceive' element={[<Customheader/>, <Customreceivepage/>]}/>
          <Route path='/CustomMain/Fixcustom' element={[<Customheader/>, <Fixcustom/>]}/>
          <Route path='/CustomMain/Moneyreturn' element={[<Customheader/>, <Moneyreturn/>]}/>
          <Route path='/CustomMain/Moneywait' element={[<Customheader/>, <Moneywait/>]}/>
          <Route path='/CustomMain/Receiveresult' element={[<Customheader/>, <Receiveresult/>]}/>
          <Route path='/CustomMain/Resultconfirm' element={[<Customheader/>, <Resultconfirm/>]}/>
          {/* <Route path="/CreateRoomModal" element={<PrivateRoute authenticated={access} component={<CreateRoomModal/>} />}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
