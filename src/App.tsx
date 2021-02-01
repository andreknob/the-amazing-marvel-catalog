import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import AppBar from './components/app-bar/AppBar';
import Home from './screens/home/Home';
import ComicsList from './screens/comics/ComicsList';
import CharactersList from './screens/characters/CharactersList';
import ComicsFavoritesList from './screens/comics/favorites/ComicFavoritesList';

const theme = {
  primary: 'white',
  secondary: '#af0000',
  backgroundPrimary: '#202024',
  backgroundSecondary: '#121214',
  hover: '#444',
};

function App(): ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/comics" exact component={ComicsList} />
          <Route
            path="/comics/favorites"
            exact
            component={ComicsFavoritesList}
          />
          <Route path="/characters" exact component={CharactersList} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
