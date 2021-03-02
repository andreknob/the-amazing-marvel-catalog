import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { render, screen } from '../../test-utils';
import PaginationBar from './PaginationBar';

function TestingComponent() {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          component={() => (
            <PaginationBar
              pagination={{ limit: 20, count: 20, total: 48554, offset: 0 }}
              query={new URLSearchParams()}
            />
          )}
        />
      </Switch>
    </Router>
  );
}

describe('PaginationBar', () => {
  describe('on rendering 2428 pages', () => {
    describe('at first page', () => {
      test('renders the right buttons', async () => {
        render(<TestingComponent />);

        const linkElements = screen.getAllByRole('link');
        const testingValues = [
          null,
          null,
          '1',
          '2',
          '3',
          '4',
          '5',
          '...',
          '2428',
          null,
          null,
        ];

        linkElements.forEach((element, index) => {
          if (testingValues[index] != null) {
            expect(element).toHaveTextContent(testingValues[index] ?? '');
          }
        });
      });
    });
  });
});
