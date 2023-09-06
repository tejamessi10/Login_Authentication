import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Logout() {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };
  useEffect(() => {
    if (!localStorage.getItem('username')) {
      navigate('/login');
    }
  }, []);
  return (
    <div>
      <h1>Congratulations you are an authenticated user</h1>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default Logout;
