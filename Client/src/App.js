import { Switch, Route, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';
import { PublicRoute } from './components/PublicRoute';
import { PrivateRoute } from './components/PrivateRoute';
import { useEffect, useState } from 'react';
import { getToken, removeUserSession, setUserSession } from './utils/common';
import axios from 'axios';

function App() {
  const { pathname } = useLocation();
  console.log('pathname=', pathname);

  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    axios
      .get(`http://localhost:5001/verifyToken?token=${token}`)
      .then((res) => {
        setAuthLoading(false);
        setUserSession(res.data.token, res.data.user);
      })
      .catch((error) => {
        setAuthLoading(false);
        removeUserSession();
        console.log('error=', error);
      });
  }, []);

  if (authLoading) {
    return <div>Checking authentication....</div>;
  }

  return (
    <>
      <Header>
        <StyledLink exact isActive={pathname === '/'} to="/">
          Home
        </StyledLink>
        <StyledLink isActive={pathname === '/login'} to="/login">
          Login<small>Access without token only</small>
        </StyledLink>
        <StyledLink isActive={pathname === '/dashboard'} to="/dashboard">
          Dashboard <small>Access with token only</small>
        </StyledLink>
      </Header>

      <Content>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/login" component={Login} /> */}
          {/* can be accessible without token */}
          <PublicRoute path="/login" component={Login} />
          {/* <Route path="/dashboard" component={Dashboard} /> */}
          {/* can be accessible with token only */}
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </Content>
    </>
  );
}

export default App;

const Header = styled.header`
  padding: 10px;
  background-color: #edf2f4;
  border-bottom: 1px solid #999;

  small {
    color: #666;
  }
`;
const StyledLink = styled(Link)`
  color: ${(props) => (props.isActive === true ? '#2c7613' : '#0072ff')};
  text-decoration: none;
  margin-left: 20px;
  margin-right: 5px;

  :hover {
    color: #8a0f53;
  }
`;
const Content = styled.div`
  padding: 20px;
`;
