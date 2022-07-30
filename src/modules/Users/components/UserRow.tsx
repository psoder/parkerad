import { format } from "date-fns";
import { User } from "modules/Users/types";
import { Tab, Table } from "semantic-ui-react";

const UserRow = ({ user }: { user: User }) => {
  return (
    <Table.Row>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.reviews.length}</Table.Cell>
      <Table.Cell>{user.locationsAdded.length}</Table.Cell>
      <Table.Cell>
        {format(new Date(user.dateCreated), "dd-MM-yyyy")}
      </Table.Cell>
    </Table.Row>
  );
};

export default UserRow;
