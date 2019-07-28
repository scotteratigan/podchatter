import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import TopBanner from "./components/TopBanner";
// import logo from './logo.svg';
import "./App.css";

function App() {
  return (
    <div className="App">
      <TopBanner />
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search/">Search for a Podcast</Link>
              </li>
              <li>
                <Link to="/users/">Users</Link>
              </li>
            </ul>
          </nav>

          <Route path="/" exact component={Index} />
          <Route path="/search/" component={Search} />
          <Route path="/users/" component={Users} />
        </div>
      </Router>
    </div>
  );
}

export default App;

function Index() {
  return <h2>Home</h2>;
}

function Search() {
  return <h2>Search for a Podcast!</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
