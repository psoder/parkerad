import { User } from "modules/Users/types";
import { Container, Header, Segment, Tab, Table } from "semantic-ui-react";
import UserRow from "./components/UserRow";

const Users = ({ users }: { users: User[] }) => {
  return (
    <Container fluid style={{ padding: 50 }}>
      <Segment>
        <Header>Users</Header>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>No. Ratings</Table.HeaderCell>
              <Table.HeaderCell>No. Locations Added</Table.HeaderCell>
              <Table.HeaderCell>Date Joined</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user) => {
              return <UserRow key={user.id} user={user} />;
            })}
          </Table.Body>
        </Table>
      </Segment>
    </Container>
  );
};

export default Users;
