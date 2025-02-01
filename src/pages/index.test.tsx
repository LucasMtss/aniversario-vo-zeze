import React from 'react';
import { render, screen } from '@testing-library/react';
import Index from './index';

test('renders hello world', () => {
  render(<Index />);
  const linkElement = screen.getByText(/hello world/i);
  expect(linkElement).toBeInTheDocument();
});