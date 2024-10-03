import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AvatarModal from './AvatarModal';

test('renders submit button', () => {
  render(<AvatarModal />);
  const submitButton = screen.getByText(/Submit/i);
  expect(submitButton).toBeInTheDocument();
});

test('renders choose file button', () => {
  render(<AvatarModal />);
  const chooseFileButton = screen.getByText(/choose file/i);
  expect(chooseFileButton).toBeInTheDocument();
})

test('renders modal header', () => {
  render(<AvatarModal />);
  const modalHeader = screen.getByText(/profile pic/i);
  expect(modalHeader).toBeInTheDocument();
})
