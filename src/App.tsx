import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Home from './screens/home/Home';
import ComicsList from './screens/comics/ComicsList';
import CharactersList from './screens/characters/CharactersList';

function App(): ReactElement {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/comics" component={ComicsList} />
        <Route path="/characters" component={CharactersList} />
      </Switch>
    </Router>
  );
}

export default App;
