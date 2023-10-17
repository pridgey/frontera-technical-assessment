import type { DescriptionsProps } from "antd";
import { Descriptions } from "antd";
import { styled } from "styled-components";

const DataContainer = styled.section`
  border-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 1.5rem 2rem;
`;

type StaffDataProps = {
  id: string;
  staff_id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  lastLogin: string;
};

export const StaffData = (props: StaffDataProps) => {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "id",
      children: props.id,
    },
    {
      key: "2",
      label: "Staff id",
      children: props.staff_id,
    },
    {
      key: "3",
      label: "username",
      children: props.username,
    },
    {
      key: "4",
      label: "First Name",
      children: props.firstName,
    },
    {
      key: "5",
      label: "Last Name",
      children: props.lastName,
    },
    {
      key: "6",
      label: "Email Address",
      children: props.email,
    },
    {
      key: "7",
      label: "Last Login",
      children: new Date(props.lastLogin).toLocaleDateString(),
    },
  ];

  return (
    <DataContainer>
      <Descriptions title="Staff Data" items={items} />
    </DataContainer>
  );
};
