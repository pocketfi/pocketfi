import React from 'react';
import store from './store';
import {loadUser} from './actions/authActions';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/routed/Login/Login';
import Register from './components/routed/Register/Register';
import Overview from './components/routed/Overview/Overview';
import NewTransaction from './components/routed/NewTransaction/NewTransaction';
import {fetchRate} from "./actions/rateActions";
import TransactionsList from "./components/routed/Transactions/Transactions";

export class App extends React.Component {

  constructor(props: any) {
    super(props);
    store.dispatch(loadUser());
    store.dispatch(fetchRate());
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/overview' component={Overview}/>
            <Route path='/new' component={NewTransaction}/>
            <Route path='/transactions' component={TransactionsList}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
