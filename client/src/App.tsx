import React from 'react';
import store from './store';
import {loadUser} from './actions/authActions';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './components/routed/Login/Login';
import Register from './components/routed/Register/Register';
import Overview from './components/routed/Overview/Overview';

export class App extends React.Component {

  constructor(props: any) {
    super(props);
    store.dispatch(loadUser());
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path='/overview' component={Overview}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
