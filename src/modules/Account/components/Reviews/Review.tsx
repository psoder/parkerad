import { Review } from "modules/Account/types";
import { useState } from "react";
import { Button, Icon, Input, Modal, Rating, Table } from "semantic-ui-react";
import { format } from "date-fns";
import DeleteReview from "./DeleteReview";

const Review = ({ review }: { review: Review }) => {
  const [editing, setEditing] = useState(false);
  const [state, setState] = useState({
    comment: review.comment,
    rating: review.rating,
  });

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (state.comment != review.comment || state.rating != review.rating) {
      await fetch(`/api/reviews/${review.id}/update`, {
        method: "PUT",
        body: JSON.stringify(state),
      });
    }
    window.location.reload();
  };

  return (
    <Table.Row>
      <Table.Cell>
        <Button
          icon={editing ? "save" : "edit"}
          fluid
          onClick={() => {
            if (editing) {
              handleSave();
            }
            setEditing(!editing);
          }}
        />
      </Table.Cell>

      <Table.Cell>{review.location.locationName}</Table.Cell>

      <Table.Cell>
        {editing ? (
          <Input size="small" fluid value={state.comment || ""}>
            <input name="comment" onChange={handleChange} />
          </Input>
        ) : (
          state.comment || "No comment."
        )}
      </Table.Cell>

      <Table.Cell>
        <Rating
          icon="star"
          size="large"
          maxRating={5}
          rating={state.rating}
          disabled={!editing}
          onRate={(_, { rating }) => setState({ ...state, rating: +rating! })}
        />
      </Table.Cell>

      <Table.Cell>
        {format(new Date(review.reviewDate), "dd-MM-yyyy")}
      </Table.Cell>

      <Table.Cell>
        {review.editDate
          ? format(new Date(review.editDate), "dd-MM-yyyy")
          : "-"}
      </Table.Cell>

      <Table.Cell>
        <DeleteReview
          trigger={<Button icon="delete" negative fluid />}
          onDelete={async () => {
            await fetch(`/api/reviews/${review.id}/delete`, {
              method: "DELETE",
            });
            window.location.reload();
          }}
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default Review;
