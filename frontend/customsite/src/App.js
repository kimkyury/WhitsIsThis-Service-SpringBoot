
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
            <Router>
        <Routes>
          <Route path='/CustomMain' element={[<Customheader/>, <Maincustompage/>]}/>
          <Route path='/CustomMain/Customreceive' element={[<Customheader/>, <Customreceivepage/>]}/>
          <Route path='/CustomMain/Fixcustom' element={[<Customheader/>, <Fixcustom/>]}/>
          <Route path='/CustomMain/Moneyreturn' element={[<Customheader/>, <Moneyreturn/>]}/>
          <Route path='/CustomMain/Moneywait' element={[<Customheader/>, <Moneywait/>]}/>
          <Route path='/CustomMain/Receiveresult' element={[<Customheader/>, <Receiveresult/>]}/>
          <Route path='/CustomMain/Resultconfirm' element={[<Customheader/>, <Resultconfirm/>]}/>
    </Routes>
  </Router>
    </div>
  );
}

export default App;
