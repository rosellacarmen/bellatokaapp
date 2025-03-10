import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Showcase from '../components/Showcase';
import About from '../components/About';
import Footer from '../components/Footer';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <Showcase />
          <About />
          <Footer />
        </Route>
        {/* Add other routes as needed */}
      </Switch>
    </Router>
  );
}

export default App;