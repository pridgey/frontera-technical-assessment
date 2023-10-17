import { gql, useQuery } from "@apollo/client";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { registerSlice } from "../../State/sagas/register.saga";
import { RootState } from "../../State/store";

// Using styled-components for basic page styling, Would usually put them in a "Register.styles.ts" file
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

const RegisterCard = styled.section`
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

const RegisterTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin: 0px;
`;

const ErrorText = styled.span`
  color: red;
  font-size: 1rem;
`;

const RegisterForm = styled(Form)`
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
  email?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  gender?: string;
  country?: string;
  password?: string;
  confirm?: string;
  parentFirstname?: string;
  parentLastname?: string;
};

// GraphQL Country Query
const GET_COUNTRIES = gql`
  query {
    country {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

// Helper function to convert JS Date to GraphQL Date
const convertDateToGraphQLScalar = (date?: string) => {
  if (!date) return "";

  const d = new Date(date);

  const pad = (t: number) => (t < 10 ? `0${t}` : t);

  return [
    d.getUTCFullYear(),
    pad(d.getUTCMonth() + 1),
    pad(d.getUTCDate()),
  ].join("-");
};

const Register = () => {
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.register);
  const navigate = useNavigate();

  useEffect(() => {
    if (store?.data?.successfully_registered) {
      navigate("/login?r=1");
    }
  }, [store, navigate]);

  const { data: countryData } = useQuery(GET_COUNTRIES);

  // Form actions
  const onSubmit = (values: FormTyping) => {
    const action = registerSlice.actions.register({
      email: values.email,
      firstname: values.firstName,
      lastname: values.lastName,
      parentFirstname: values.firstName,
      parentLastname: values.lastName,
      dob: convertDateToGraphQLScalar(values.dob),
      gender: values.gender,
      country: values.country,
      password: values.password,
    });
    dispatch(action);
  };

  return (
    <Container>
      <RegisterCard>
        <RegisterTitle>Register</RegisterTitle>
        {!!store.error && (
          <ErrorText>
            An error occured during registration, please try again.
          </ErrorText>
        )}
        {/* Register Form */}
        <RegisterForm name="Register" autoComplete="off" onFinish={onSubmit}>
          <Form.Item<FormTyping>
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Email is a required field",
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
          <Form.Item<FormTyping>
            label="Confirm Password"
            name="confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Passwords must match",
              }, // unsure of password requirements, but they would go here as well
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The entered password does not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FormTyping>
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "First Name is a required field",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FormTyping>
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Last Name is a required field",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FormTyping>
            label="Date of Birth"
            name="dob"
            rules={[
              {
                required: true,
                message: "Date of Birth is a required field",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item<FormTyping>
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message:
                  "Gender is a required field, but can be submitted as 'Other'",
              },
            ]}
          >
            <Select
              placeholder="gender"
              options={[
                {
                  value: "male",
                  label: "Male",
                },
                {
                  value: "female",
                  label: "Female",
                },
                {
                  value: "other",
                  label: "Other / Not Specified",
                },
              ]}
            />
          </Form.Item>
          <Form.Item<FormTyping>
            label="Country"
            name="country"
            rules={[
              {
                required: true,
                message: "Country is a required field",
              },
            ]}
          >
            <Select
              placeholder="gender"
              options={countryData?.country?.edges.map(
                (c: { node: { id: string; name: string } }) => ({
                  value: c.node.id,
                  label: c.node.name,
                })
              )}
            />
          </Form.Item>
          <ButtonBar>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <Button type="link" href="/login">
              Go to Login
            </Button>
          </ButtonBar>
        </RegisterForm>
      </RegisterCard>
    </Container>
  );
};

export default Register;
