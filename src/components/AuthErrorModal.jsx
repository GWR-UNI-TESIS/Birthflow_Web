import React from 'react';
import { useAuth } from '../context/AuthContext';

const AuthErrorModal = () => {
  const { authError, logout } = useAuth();

  if (!authError) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Authentication Error</h2>
        <p>{authError}</p>
        <button onClick={logout}>Log In Again</button>
      </div>
    </div>
  );
};

export default AuthErrorModal;