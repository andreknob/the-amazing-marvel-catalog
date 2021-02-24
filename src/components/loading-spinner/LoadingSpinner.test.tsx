import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

test('renders the container with the right styles', async () => {
  render(<LoadingSpinner />);

  const containerElement = screen.getByTestId('container-element');

  expect(containerElement).toHaveStyle('position: fixed;');
  expect(containerElement).toHaveStyle('background: rgba(0, 0, 0, 0.85);');
  expect(containerElement).toHaveStyle('width: 100%;');
  expect(containerElement).toHaveStyle('height: 100%;');
  expect(containerElement).toHaveStyle('top: 0;');
  expect(containerElement).toHaveStyle('left: 0;');
  expect(containerElement).toHaveStyle('z-index: 100;');
});

test('renders the spinner with the right styles', async () => {
  render(<LoadingSpinner />);

  const spinnerElement = screen.getByTestId('spinner-element');

  expect(spinnerElement).toHaveStyle('border: 8px solid #f3f3f3;');
  expect(spinnerElement).toHaveStyle('border-top: 8px solid #9f0000;');
  expect(spinnerElement).toHaveStyle('border-radius: 50%;');
  expect(spinnerElement).toHaveStyle('width: 75px;');
  expect(spinnerElement).toHaveStyle('height: 75px;');
  expect(spinnerElement).toHaveStyle('animation: spin 2s linear infinite;');
});

test('renders the text with the right styles', async () => {
  render(<LoadingSpinner />);

  const spinnerElement = screen.getByTestId('text-element');

  expect(spinnerElement).toHaveStyle('position: relative;');
});
