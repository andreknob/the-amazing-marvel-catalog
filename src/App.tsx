import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppBar from './components/app-bar/AppBar';
import Home from './screens/home/Home';
import ComicsList from './screens/comics/ComicsList';
import CharactersList from './screens/characters/CharactersList';

function App(): ReactElement {
  return (
    <Router>
      <AppBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/comics" exact component={ComicsList} />
        <Route path="/characters" exact component={CharactersList} />
      </Switch>
    </Router>
  );
}

export default App;
