import type { DescriptionsProps } from "antd";
import { Descriptions } from "antd";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { RootState } from "../../State/store";

const Content = styled.section`
  padding: 1.5rem 2rem;
`;

const DataContainer = styled.section`
  border-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 1.5rem 2rem;
`;

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.user);

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "id",
      children: user?.data?.id,
    },
    {
      key: "2",
      label: "Staff id",
      children: user?.data?.staff?.id,
    },
    {
      key: "3",
      label: "username",
      children: user?.data?.username,
    },
    {
      key: "4",
      label: "First Name",
      children: user?.data?.firstName,
    },
    {
      key: "5",
      label: "Last Name",
      children: user?.data?.lastName,
    },
    {
      key: "6",
      label: "Email Address",
      children: user?.data?.email,
    },
    {
      key: "7",
      label: "Last Login",
      children: new Date(user?.data?.lastLogin).toLocaleDateString(),
    },
  ];

  return (
    <Content>
      <DataContainer>
        <Descriptions title="Staff Data" items={items} />
      </DataContainer>
    </Content>
  );
};

export default Dashboard;
