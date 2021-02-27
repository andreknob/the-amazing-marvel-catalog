import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { render, fireEvent, screen } from '../../test-utils';
import BarButton from './BarButton';
import { theme } from '../../App';

function TestingComponent({ selected = false }) {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          component={() => (
            <BarButton to="/test" selected={selected}>
              Test link
            </BarButton>
          )}
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

    test('the element has the primary color', async () => {
      render(<TestingComponent />);

      const styledElement = screen.getByRole('link');
      expect(styledElement).toHaveStyle(`color: ${theme.primary};`);
    });
  });

  describe('if selected', () => {
    test('the element has the secondary color', async () => {
      render(<TestingComponent selected />);

      const styledElement = screen.getByRole('link');
      expect(styledElement).toHaveStyle(`color: ${theme.secondary};`);
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
