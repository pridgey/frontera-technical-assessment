import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { loginSlice } from "../../State/sagas/login.saga";
import { RootState } from "../../State/store";
import { useSearchParams } from "react-router-dom";

// Using styled-components for basic page styling, Would usually put them in a "Login.styles.ts" file
const Container = styled.main`
  align-items: center;
  bottom: 0px;
  display: flex;
  justify-content: center;
  left: 0px;
  position: fixed;
  right: 0px;
  top: 0px;
`;

const LoginCard = styled.section`
  align-items: flex-start;
  border-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  padding: 2.5rem;
  width: 500px;
`;

const LoginTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin: 0px;
`;

const InfoText = styled.span`
  color: blue;
  font-size: 1rem;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 1rem;
`;

const LoginForm = styled(Form)`
  width: 100%;
`;

const ButtonBar = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 0px 1rem;
`;

// Form field types
type FormTyping = {
  username?: string;
  password?: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.login);
  const [searchParams] = useSearchParams();

  // Form actions
  const onSubmit = (values: FormTyping) => {
    const action = loginSlice.actions.login({
      username: values.username,
      password: values.password,
    });
    dispatch(action);
  };

  return (
    <Container>
      <LoginCard>
        <LoginTitle>Login</LoginTitle>
        {!!searchParams.has("r") && (
          <InfoText>
            You have successfully been registered. To log in, you will need to
            confirm your email.
          </InfoText>
        )}
        {!!store.error && (
          <ErrorText>
            An error occured during login, please try again.
          </ErrorText>
        )}
        {/* Login Form */}
        <LoginForm name="login" autoComplete="off" onFinish={onSubmit}>
          <Form.Item<FormTyping>
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Username is a required field",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FormTyping>
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Password is a required field",
              }, // unsure of password requirements, but they would go here as well
            ]}
          >
            <Input.Password />
          </Form.Item>
          <ButtonBar>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button type="link" href="/register">
              Go to Register
            </Button>
          </ButtonBar>
        </LoginForm>
      </LoginCard>
    </Container>
  );
};

export default Login;
