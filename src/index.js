import React from "react";
import ReactDOM from "react-dom";
import "./css/styles/index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReduce from "./reducers/reducer";

let store = createStore(rootReduce);

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
};

const Root = () => (
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.unregister();
