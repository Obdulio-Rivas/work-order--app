import './App.css';
import { Navigation } from './components/navigation/Navigation';
import { Home } from './components/work_order/Home';
import { WorkOrder } from './components/work_order/WorkOrder';
import { WorkOrders } from './components/work_order/WorkOrders';
import { Employee } from './components/employee/Employee';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { WorkOrderPage } from './components/work_order/WorkOrderPage';

import Upload from './components/testComponents/Upload';

function App() {

  return (
    <Router>
      <Navigation/>
      <Switch>
        <div className={'containerApp'}>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/newWorkOrder">
            <WorkOrder/>
          </Route>
          <Route exact path="/workOrders">
            <WorkOrders/>
          </Route>
          <Route exact path="/printWorkOrder/:id_work_order">
            <WorkOrderPage/>
          </Route>
          <Route exact path="/newEmployee">
            <Employee/>
          </Route>
          <Route exact path="/test">
            <Upload/>
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;