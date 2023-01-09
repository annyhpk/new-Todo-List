import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import LoginContext from '../../contexts/Login';

import { Nav, Button } from './styled';

function GlobalNavBar() {
  const { logined } = useContext(LoginContext);

  const onClickLogout = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <Nav>
      <NavLink to="/">
        <p>Home</p>
      </NavLink>
      {logined ? (
        <>
          <NavLink to="/todo">
            <p>Todo</p>
          </NavLink>
          <Button type="button" onClick={onClickLogout}>
            로그아웃
          </Button>
        </>
      ) : (
        <div>
          <NavLink to="/login">
            <Button type="button">로그인</Button>
          </NavLink>
          <NavLink to="/signup">
            <Button type="button">회원가입</Button>
          </NavLink>
        </div>
      )}
    </Nav>
  );
}

export default GlobalNavBar;
