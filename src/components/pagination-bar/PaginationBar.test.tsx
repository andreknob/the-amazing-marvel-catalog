import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { render, screen } from '../../test-utils';
import PaginationBar from './PaginationBar';

function TestingComponent({ searchParams = '' }) {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          component={() => (
            <PaginationBar
              pagination={{ limit: 20, count: 20, total: 48554, offset: 0 }}
              query={new URLSearchParams(searchParams)}
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
      test('renders the correct buttons', async () => {
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

    describe('at third page', () => {
      test('renders the correct buttons', async () => {
        render(<TestingComponent searchParams="?page=3" />);

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

    describe('at fifth page', () => {
      test('renders the correct buttons', async () => {
        render(<TestingComponent searchParams="?page=5" />);

        const linkElements = screen.getAllByRole('link');

        const testingValues = [
          null,
          null,
          '1',
          '...',
          '4',
          '5',
          '6',
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

    describe('at sixth page', () => {
      test('renders the correct buttons', async () => {
        render(<TestingComponent searchParams="?page=6" />);

        const linkElements = screen.getAllByRole('link');

        const testingValues = [
          null,
          null,
          '1',
          '...',
          '5',
          '6',
          '7',
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

    describe('at page 2425', () => {
      test('renders the correct buttons', async () => {
        render(<TestingComponent searchParams="?page=2425" />);

        const linkElements = screen.getAllByRole('link');

        const testingValues = [
          null,
          null,
          '1',
          '...',
          '2424',
          '2425',
          '2426',
          '2427',
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

    describe('at page 2427', () => {
      test('renders the correct buttons', async () => {
        render(<TestingComponent searchParams="?page=2427" />);

        const linkElements = screen.getAllByRole('link');

        const testingValues = [
          null,
          null,
          '1',
          '...',
          '2425',
          '2426',
          '2427',
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

    describe('at last page', () => {
      test('renders the correct buttons', async () => {
        render(<TestingComponent searchParams="?page=2428" />);

        const linkElements = screen.getAllByRole('link');

        const testingValues = [
          null,
          null,
          '1',
          '...',
          '2425',
          '2426',
          '2427',
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
