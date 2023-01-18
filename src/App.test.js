import { render, screen } from '@testing-library/react';
import {App, reqItems} from './App';

test('expect app function to exist', () => {
  expect(App).toBeDefined();
});

test('expect reqItems function to exist', () => {
  expect(reqItems).toBeDefined();
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
