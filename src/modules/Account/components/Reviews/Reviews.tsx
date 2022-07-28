import { Tab, Table } from "semantic-ui-react";
import { UserContext } from "pages/account";
import { useContext } from "react";
import Review from "./Review";

const Reviews = () => {
  const user = useContext(UserContext);
  return (
    <Tab.Pane>
      <h1>Reviews</h1>
      <Table definition compact>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Location</Table.HeaderCell>
            <Table.HeaderCell>Comment</Table.HeaderCell>
            <Table.HeaderCell>Rating</Table.HeaderCell>
            <Table.HeaderCell>Review Date</Table.HeaderCell>
            <Table.HeaderCell>Edit Date</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {user?.reviews.map((review) => {
            return <Review key={review.id} review={review} />;
          })}
        </Table.Body>
      </Table>
    </Tab.Pane>
  );
};

export default Reviews;
