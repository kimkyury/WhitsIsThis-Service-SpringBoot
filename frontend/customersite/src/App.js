
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Maincustompage from '../src/customerpages/Maincustompage/Maincustompage';
import Customreceivepage from '../src/customerpages/Customreceivepage/Customreceivepage';
import Fixcustom from '../src/customerpages/Customresultpage/Fixcustompage/Fixcustom';
import Moneyreturn from './customerpages/Customresultpage/Moneyreturnpage/Moneyreturn';
import Moneywait from './customerpages/Customresultpage/Moneywaitpage/Moneywait';
import Receiveresult from './customerpages/Customresultpage/Receiveresultpage/Receiveresult';
import Customheader from './customcomponent/customheader/customheader';
import Resultconfirm from './customerpages/Customresultpage/resultconfirm/Resultconfirm';

function App() {
  return (
    <div>
      <Router basename="/customermain">
        <Routes>
          <Route path='/' element={[<Customheader/>, <Maincustompage/>]}/>
          <Route path='/customerreceive' element={[<Customheader/>, <Customreceivepage/>]}/>
          <Route path='/fixcustom' element={[<Customheader/>, <Fixcustom/>]}/>
          <Route path='/moneyreturn' element={[<Customheader/>, <Moneyreturn/>]}/>
          <Route path='/moneywait' element={[<Customheader/>, <Moneywait/>]}/>
          <Route path='/receiveresult' element={[<Customheader/>, <Receiveresult/>]}/>
          <Route path='/resultconfirm' element={[<Customheader/>, <Resultconfirm/>]}/>
    </Routes>
  </Router>
    </div>
  );
}

export default App;
