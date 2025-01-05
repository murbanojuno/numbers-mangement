import '@testing-library/jest-dom';
import { act } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Header } from '../../../components/Layout/Header';
import userEvent from '@testing-library/user-event';

describe('Header Component', () => {
  it('renders logo and navigation buttons', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Check logo is rendered
    expect(screen.getByAltText('Company Logo')).toBeInTheDocument();

    // Check navigation buttons are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('Numbers')).toBeInTheDocument();
  });

  it('navigates to correct routes on button clicks', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/register" element={<div>Register Page</div>} />
          <Route path="/numbers" element={<div>Numbers Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Simulate clicking on the Register button
    const registerButton = screen.getByText('Register');
    await act(async () => {
      await user.click(registerButton);
    });

    // Assert that the Register Page is displayed
    expect(screen.getByText('Register Page')).toBeInTheDocument();

    // Simulate clicking on the Numbers button
    const numbersButton = screen.getByText('Numbers');
    await act(async () => {
      await user.click(numbersButton);
    });

    // Assert that the Numbers Page is displayed
    expect(screen.getByText('Numbers Page')).toBeInTheDocument();
  });
});
