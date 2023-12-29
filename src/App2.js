import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { setAuthenticated } from './store/auth/authActions';

import Login from './views/pages/authentication/auth-forms/AuthLogin';
import Dashboard from './Dashboard';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const isAuthenticated = storedAuth === 'true';
    dispatch(setAuthenticated(isAuthenticated));
    return () => {
      localStorage.removeItem('isAuthenticated');
    };
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Dashboard />} />
        </>
      ) : (
        <Route path="/" element={<Login />} />
      )}
    </Routes>
  );
};

export default App;
