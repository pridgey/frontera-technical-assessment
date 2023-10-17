import type { DescriptionsProps } from "antd";
import { Descriptions } from "antd";
import { styled } from "styled-components";

const DataContainer = styled.section`
  border-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 1.5rem 2rem;
`;

type ParentDataProps = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  lastLogin: string;
  studentName: string;
};

export const ParentData = (props: ParentDataProps) => {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "id",
      children: props.id,
    },
    {
      key: "2",
      label: "username",
      children: props.username,
    },
    {
      key: "3",
      label: "First Name",
      children: props.firstName,
    },
    {
      key: "4",
      label: "Last Name",
      children: props.lastName,
    },
    {
      key: "5",
      label: "Email Address",
      children: props.email,
    },
    {
      key: "6",
      label: "Last Login",
      children: new Date(props.lastLogin).toLocaleDateString(),
    },
    {
      key: "7",
      label: "Student Name",
      children: props.studentName,
    },
  ];

  return (
    <DataContainer>
      <Descriptions title="Parent Data" items={items} />
    </DataContainer>
  );
};
