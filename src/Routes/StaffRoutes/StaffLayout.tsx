import { Button } from "antd";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { loginSlice } from "../../State/sagas/login.saga";

const Container = styled.main`
  align-items: flex-start;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  left: 0px;
  position: fixed;
  right: 0px;
  top: 0px;
`;

const Header = styled.header`
  border-bottom: 1px solid black;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
  font-weight: 500;
  justify-content: space-between;
  padding: 1.5rem;
  width: 100%;
`;

const Content = styled.section`
  padding: 1.5rem 2rem;
`;

type StaffLayoutProps = {
  children: React.ReactNode;
  username: string;
};

const StaffLayout = ({ children, username }: StaffLayoutProps) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Header>
        <span>Welcome back, {username}</span>
        <Button
          type="text"
          onClick={() => {
            dispatch(loginSlice.actions.logout());
          }}
        >
          Logout
        </Button>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};

export default StaffLayout;
