//3rd party exports
import React from "react";
import ReactDOM from "react-dom";

//components & state
import App from "./App";
// import store from './redux/store';
// import { Provider } from 'react-redux';


//styles
import {Theme} from './theme';

ReactDOM.render(
  // <Provider store={store}>
    <Theme >
      <App/> 
    </Theme>
  // </Provider>
  ,document.querySelector("#root")
);