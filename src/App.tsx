import React, { ReactElement, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import AppBar from './components/app-bar/AppBar';
import LoadingSpinner from './components/loading-spinner/LoadingSpinner';
import Home from './screens/home/Home';

const ComicsList = lazy(() => import('./screens/comics/ComicsList'));
const FavoriteComicsList = lazy(
  () => import('./screens/comics/favorites/FavoriteComicsList'),
);

const CharactersList = lazy(
  () => import('./screens/characters/CharactersList'),
);
const FavoriteCharactersList = lazy(
  () => import('./screens/characters/favorites/FavoriteCharactersList'),
);

export const theme = {
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
        <Suspense fallback={<LoadingSpinner />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/comics" exact component={ComicsList} />
            <Route
              path="/comics/favorites"
              exact
              component={FavoriteComicsList}
            />
            <Route path="/characters" exact component={CharactersList} />
            <Route
              path="/characters/favorites"
              exact
              component={FavoriteCharactersList}
            />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
