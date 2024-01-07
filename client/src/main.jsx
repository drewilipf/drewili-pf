import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./reduxToolkit/store.js";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider
          domain="drewili.us.auth0.com"
          clientId="1D6DJezLcvz5RAM9cqQs4q0ukKUSe6nI"
          authorizationParams={{
            redirect_uri: window.location.origin
          }}>
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
);
