import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { render, screen } from '../../test-utils';
import LetterFilterBar from './LetterFilterBar';
import { ALPHABET } from './constants';

function TestingComponent() {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          component={() => <LetterFilterBar query={new URLSearchParams()} />}
        />
      </Switch>
    </Router>
  );
}

describe('LetterFilterBar', () => {
  describe('on rendering', () => {
    test('all letters from the alphabet are displayed as links', async () => {
      render(<TestingComponent />);

      const linkElements = screen.getAllByRole('link');
      expect(linkElements).toHaveLength(ALPHABET.length);

      linkElements.forEach((element, index) => {
        expect(element).toHaveTextContent(ALPHABET[index]);
      });
    });
  });
});
