import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from './redux/authSlice';

interface LoggedInGuardProps {
  element: React.ReactElement;
}

export const UnprotectedPageGuard: React.FC<LoggedInGuardProps> = ({ element }) => {
  const auth = useSelector(selectIsAuth);
  return auth.isAuthenticated ? <Redirect exact to="/dic" /> : element;
};

export const ProtectedPageGuard: React.FC<LoggedInGuardProps> = ({ element }) => {
  const auth = useSelector(selectIsAuth);
  return auth.isAuthenticated ? element : <Redirect to="/login" />;
};