import { User } from "modules/Users/types";
import { Table } from "semantic-ui-react";
import UserRow from "./UserRow";

const UserTable = ({ users }: { users: User[] }) => {
  const rows = users.map((user) => {
    return <UserRow key={user.id} user={user} />;
  });

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Username</Table.HeaderCell>
          <Table.HeaderCell>No. Reviews</Table.HeaderCell>
          <Table.HeaderCell>Average Rating</Table.HeaderCell>
          <Table.HeaderCell>No. Locations Added</Table.HeaderCell>
          <Table.HeaderCell>Date Joined</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>{rows}</Table.Body>
    </Table>
  );
};

export default UserTable;
