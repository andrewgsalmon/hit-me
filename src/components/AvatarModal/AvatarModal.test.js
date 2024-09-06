import { render, screen } from '@testing-library/react';
import AvatarModal from './AvatarModal';

test('renders learn react link', () => {
  render(<AvatarModal />);
  const linkElement = screen.getByText(/Submit/i);
  expect(linkElement).toBeInTheDocument();
});
