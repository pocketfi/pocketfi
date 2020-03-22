import React, {useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from "./actions/loadUser";
import AppNavbar from "./components/AppNavbar";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
      <Provider store={store}>
        <div className="App">
            <AppNavbar />

        </div>
      </Provider>
  );
};

export default App;
