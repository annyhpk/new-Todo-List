import { NavLink } from 'react-router-dom';
import useLoginContext from '../../contexts/Login';
import tokenStorage from '../../utils/tokenStorage';

// style
import { Nav, Button } from './styled';

function GlobalNavBar() {
  const { isLogin, actions } = useLoginContext();

  const onClickLogout = () => {
    tokenStorage.clearToken();
    actions.logout();
  };

  return (
    <Nav>
      <NavLink to="/">
        <p>Home</p>
      </NavLink>
      {isLogin ? (
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
