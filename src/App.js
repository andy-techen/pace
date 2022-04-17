import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import Profile from "./components/Profile";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Header />
      <Router basename="/pace">
        <Switch>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/stats" />
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
