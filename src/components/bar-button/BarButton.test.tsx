import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import BarButton from './BarButton';

function TestingComponent() {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          component={() => <BarButton to="/test">Test link</BarButton>}
        />
        <Route
          path="/test"
          exact
          component={() => <BarButton to="/">Home link</BarButton>}
        />
      </Switch>
    </Router>
  );
}

describe('BarButton', () => {
  describe('on rendering', () => {
    test('the test bar button is visible', async () => {
      render(<TestingComponent />);

      const testLinkElement = screen.getByRole('link');
      expect(testLinkElement).toHaveTextContent('Test link');
    });
  });

  describe('on first click', () => {
    test('the home bar button is visible', async () => {
      render(<TestingComponent />);

      const testLinkElement = screen.getByRole('link');

      fireEvent.click(testLinkElement);

      const homeLinkElement = screen.getByRole('link');
      expect(homeLinkElement).toHaveTextContent('Home link');

      fireEvent.click(homeLinkElement);
    });
  });

  describe('on second click', () => {
    test('the test bar button is visible again', async () => {
      render(<TestingComponent />);

      const testLinkElement = screen.getByRole('link');

      fireEvent.click(testLinkElement);

      const homeLinkElement = screen.getByRole('link');

      fireEvent.click(homeLinkElement);

      const secondTestLinkElement = screen.getByRole('link');
      expect(secondTestLinkElement).toHaveTextContent('Test link');
    });
  });
});
