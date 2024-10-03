import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Comment from './Comment';

const mockArtistComment = {
  comment: 'This is a test comment',
  name: 'Andrew Salmon',
  created_at: '2024-10-02T12:34:56Z',
  email: 'johndoe@example.com'
};

test('renders Comment component with mock props', () => {
  render(<Comment artistComment={mockArtistComment} />);

  expect(screen.getByText('Andrew Salmon')).toBeInTheDocument();

  expect(screen.getByText('This is a test comment')).toBeInTheDocument();
});