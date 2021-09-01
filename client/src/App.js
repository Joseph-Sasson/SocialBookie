import React, { useState, useEffect } from "react";
import "./css/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";
import Account from "./component/Account";
import MyBets from "./component/MyBets";

function App() {
  const [user, setUser] = useState(null);
  const [odds, setOdds] = useState(null)
  
  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLogout() {
    if (window.confirm("Are you sure you want to logout?"))
      fetch("/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
          setUser(null);
        }
      });
  }

  const addHomeToSlip =(bet)=>{
    console.log(bet)
  }

  const addAwayToSlip =(bet)=>{
    console.log(bet)
  }

  const mustLogin =()=>{
    alert("You must be logged in to place a bet!")
  }
  
  if (!user) {
    return (
      <Router>
        <div>
          <nav>
            <div>
              <Link to={"/"}>
                SocialBets
              </Link>
              <div>
                <ul>
                  <li>
                    <Link to={"/home"}>
                      Home
                    </Link>
                  </li>  
                  <li>
                    <Link to={"/login"}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to={"/signup"}>
                      Sign up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div>
            <div>
              <Switch>
                <Route
                  path="/home"
                  component={() => (<Home home={mustLogin} away={mustLogin} />)}
                />
                <Route
                  path="/login"
                  component={() => <Login setUser={setUser} />}
                />
                <Route
                  path="/signup"
                  component={() => <Signup setUser={setUser} />}
                />
                <Route 
                  path="/"
                  component={() => (<Home home={mustLogin} away={mustLogin} />)}
                />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <div>
        <nav>
          <div>
            <Link to={"/"}>
              SocialBets
            </Link>
            <div>
              <ul>
                <li>
                  <Link to={"/home"}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={"/mybets"}>
                    My Bets
                  </Link>
                </li>
                <li>
                  <Link to={"/account"}>
                    My Account
                  </Link>
                </li>
                <li>
                  <Link to={"/"} onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div>
          <div>
            <Switch>
              <Route
                path="/home"
                component={() => (<Home home={addHomeToSlip} away={addAwayToSlip} odds={odds}/>)}
              />
              <Route
                path="/mybets"
                component={() => (<MyBets />)}
              />
              <Route
                path="/account"
                component={() => (<Account user={user} setUser={setUser} />)}
              />
              <Route
                path="/"
                component={() => (<Home home={addHomeToSlip} away={addAwayToSlip} odds={odds} />)}
              />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
