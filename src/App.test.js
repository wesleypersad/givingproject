import { render, screen } from '@testing-library/react';
import App from './App';

test('expect app function to exist', () => {
  expect(App).toBeDefined();
});

/* test('confirm navbar component is rendered', () => {
  const { getByText } = render(<App />);
  const navElement = getByText("home");
  expect(navElement).toBeTruthy();
}); */

/* test('find all roles on page', async () => {
  render(<App />);
  const roleList = await screen.findAllByRole("Routes");
  console.log(roleList);
  expect(roleList).toBeGreaterThan(0);
}); */
