import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { render, screen, fireEvent } from '../../test-utils';
import Nav from './Nav';

function TestingComponent() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={() => <Nav />} />
        <Route
          path="/comics"
          exact
          component={() => (
            <>
              <Nav />
              <h1>Comics</h1>
            </>
          )}
        />
        <Route
          path="/characters"
          exact
          component={() => (
            <>
              <Nav />
              <h1>Characters</h1>
            </>
          )}
        />
      </Switch>
    </Router>
  );
}

describe('Nav', () => {
  describe('on rendering', () => {
    test('displays the Comics link', async () => {
      render(<TestingComponent />);

      const linkElements = screen.getAllByRole('link');
      expect(linkElements[0]).toHaveTextContent('Comics');
      fireEvent.click(linkElements[0]);

      const heading = screen.getByRole('heading');
      expect(heading).toHaveTextContent('Comics');
    });

    test('displays the Characters link', async () => {
      render(<TestingComponent />);

      const linkElements = screen.getAllByRole('link');
      expect(linkElements[1]).toHaveTextContent('Characters');
      fireEvent.click(linkElements[1]);

      const heading = screen.getByRole('heading');
      expect(heading).toHaveTextContent('Characters');
    });
  });
});
