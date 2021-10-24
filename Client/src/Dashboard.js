import React from 'react';
import { getUser, removeUserSession } from './utils/common';

function Dashboard(props) {
const user = getUser();

  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  };
  return (
    <div>
      <h2>Wlecome {user.name}</h2>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
