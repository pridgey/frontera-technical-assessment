import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { RootState } from "../../State/store";
import { ParentData } from "../../components/ParentData";
import { StaffData } from "../../components/StaffData";
import { Button } from "antd";
import { loginSlice } from "../../State/sagas/login.saga";

// Using styled-components for basic page styling, Would usually put them in a "Login.styles.ts" file
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

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const isStaff = !!user.data.staff;

  return (
    <Container>
      <Header>
        <span>Hello {user.data.firstName}</span>
        <Button
          type="text"
          onClick={() => {
            dispatch(loginSlice.actions.logout());
          }}
        >
          Logout
        </Button>
      </Header>
      <Content>
        {isStaff ? (
          <StaffData {...user.data} staff_id={user.data.staff.id} />
        ) : (
          <ParentData
            {...user.data}
            studentName={`${user.data.students.firstname} ${
              user.data.students.lastname || user.data.lastName
            }`}
          />
        )}
      </Content>
    </Container>
  );
};

export default Dashboard;
