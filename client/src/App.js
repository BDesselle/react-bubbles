import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import BubblePage from "./components/BubblePage";

function App() {
  /* const [colorList, setColorList] = React.useState([]); */

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          localStorage.getItem("token") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  };

  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        {/*
          Build a PrivateRoute component that will
          display BubblePage when you're authenticated
        */}
        <PrivateRoute path="/bubble" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
