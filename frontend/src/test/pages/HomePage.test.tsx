import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import HomePage from '../../pages/HomePage';

describe('HomePage Component', () => {
  it('renders title and subtitle', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText('Effortlessly Manage Your Company Numbers')).toBeInTheDocument();
    expect(screen.getByText('Welcome to the Numbers Management Application')).toBeInTheDocument();
  });

  it('renders the hero image', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <HomePage />
      </MemoryRouter>
    );

    const heroImage = screen.getByAltText('Hero Image');
    expect(heroImage).toBeInTheDocument();
  });
});
