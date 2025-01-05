import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../components/Layout/MainLayout';
import HomePage from '../pages/HomePage';
import RegisterPage from '../features/numbers/RegisterPage';
import NumbersPage from '../features/numbers/NumbersPage';

export const AppRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/numbers" element={<NumbersPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};
