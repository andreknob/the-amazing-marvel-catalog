import React from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from './Button';

test('renders the button', async () => {
  render(<Button onClick={cleanup}>Test button</Button>);

  const buttonElement = screen.getByTestId('button-element');
  expect(buttonElement).toHaveTextContent('Test button');

  fireEvent.click(buttonElement);

  expect(() => screen.getByTestId('button-element')).toThrowError();
});
