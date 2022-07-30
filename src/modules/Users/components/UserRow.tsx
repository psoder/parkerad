import { format } from "date-fns";
import { User } from "modules/Users/types";
import { Rating, Table } from "semantic-ui-react";

const UserRow = ({ user }: { user: User }) => {
  let avgRating = 0;
  if (user.reviews.length > 0) {
    avgRating =
      user.reviews.map((r) => r.rating).reduce((acc, curr) => acc + curr) /
      user.reviews.length;
  }

  return (
    <Table.Row>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.reviews.length}</Table.Cell>
      <Table.Cell>
        <Rating rating={avgRating} maxRating={5} disabled icon="star" />
      </Table.Cell>
      <Table.Cell>{user.locationsAdded.length}</Table.Cell>
      <Table.Cell>
        {format(new Date(user.dateCreated), "dd-MM-yyyy")}
      </Table.Cell>
    </Table.Row>
  );
};

export default UserRow;
