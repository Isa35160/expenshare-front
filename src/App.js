import React, {Component} from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GroupID from "./Components/GroupID/GroupID";
import ExpenShare from "./Components/ExpenShare/Expenshare";



class App extends Component {
  render() {
    return (
        <section className="body">
          <BrowserRouter>
            <div>
            <Route path="/" exact component={GroupID} />
            <Route path="/group/:slug" component={ExpenShare} />
            </div>
          </BrowserRouter>
        </section>
    );
  }
}

export default App;
