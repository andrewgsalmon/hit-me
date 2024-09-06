import { render, screen } from '@testing-library/react';
import Inputs from './Inputs';

const user = {
  name: 'andrew'
}

test('renders learn react link', () => {
  render(<Inputs />);
  const linkElement = screen.getByText(/welcome/i);
  expect(linkElement).toBeInTheDocument();
});
