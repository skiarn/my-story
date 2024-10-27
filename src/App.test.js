import { render, screen } from '@testing-library/react';
import App from './App';

test('renders share My Story link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Share My Story/i);
  expect(linkElement).toBeInTheDocument();
});
