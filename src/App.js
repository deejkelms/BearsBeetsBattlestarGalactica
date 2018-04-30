import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import Shows from './Shows'
import SelectedShow from './SelectedShow'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Shows />
            <Route exact path="/" render={ () => <Redirect to='/shows' /> } />
            <Route exact path="/shows" component={Home} />
            <Route path="/shows/:showId" component={SelectedShow} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App
