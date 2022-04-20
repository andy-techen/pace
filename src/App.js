import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Main from "./components/Main";
import Profile from "./components/Profile";
import Header from "./components/Header";

export default function App() {
  useEffect(() => {
    if (localStorage.getItem("userId") == null) {
      localStorage.setItem("userId", uuidv4());  // set new userId for new session
    }
  }, []);

  return (
    <>
      <Header />
      <Router basename="/pace">
        <Switch>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
