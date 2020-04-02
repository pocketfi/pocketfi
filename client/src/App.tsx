import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/loadUser';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

class App extends React.Component {
  constructor(props: any) {
    super(props);
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route path='/login' component={Login}/>
              <Route path='/register' component={Register}/>
              <Redirect path='/' to='/login'/>
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
