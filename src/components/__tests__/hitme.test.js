import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
})

test('test', () => {
  expect(true).toBe(true);
})
