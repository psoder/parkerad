import { User } from "modules/Users/types";
import { Container, Divider, Header, Segment } from "semantic-ui-react";
import UserTable from "./components/UserTable";

const Users = ({ users }: { users: User[] }) => {
  return (
    <Container style={{ padding: 50 }}>
      <Segment>
        <Header>Users</Header>
        <Divider />
        <UserTable users={users} />
      </Segment>
    </Container>
  );
};

export default Users;
