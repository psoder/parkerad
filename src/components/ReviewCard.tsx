import { Review, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button, Card, Input, Modal, Rating } from "semantic-ui-react";

const ReviewCard = ({ review, user }: { review: Review; user: User }) => {
  const { data: session, status } = useSession();
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState<string>(review?.comment ?? "");

  const handleSave = async () => {
    if (rating != review.rating || comment != (review.comment ?? "")) {
      await fetch(`/api/reviews/${review.id}/update`, {
        method: "PUT",
        body: JSON.stringify({
          reviewId: review.id,
          rating: rating,
          comment: comment == "" ? null : comment,
        }),
      });
      window.location.reload();
    }
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Rating
            rating={rating}
            maxRating={5}
            icon="star"
            size="huge"
            disabled={!editing}
            onRate={(_, { rating }) => setRating(rating as number)}
          />

          {status === "authenticated" && session.user.id == review.userId && (
            <EditButtons
              editing={editing}
              setEditing={setEditing}
              review={review}
              onSave={handleSave}
            />
          )}
        </Card.Header>

        <Card.Description>
          {editing ? (
            <Input
              size="small"
              fluid
              onChange={(e, { value }) => setComment(value)}
            >
              <input value={comment} type="text" />
            </Input>
          ) : (
            comment && (
              <>
                <i>"{comment}"</i> <br />
              </>
            )
          )}
          - {user.name}
        </Card.Description>

        <Card.Meta>
          Reviewd on the {format(new Date(review.reviewDate), "dd-mm-yyyy")}
          {review.editDate && (
            <>
              <br />
              Edited on the {format(new Date(review.editDate), "dd-mm-yyyy")}
            </>
          )}
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

const EditButtons = ({
  review,
  editing,
  setEditing,
  onSave,
}: {
  review: Review;
  editing: boolean;
  setEditing: (editing: boolean) => void;
  onSave: () => void;
}) => {
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <div>
      <Button
        icon={editing ? `save` : `edit`}
        compact
        onClick={() => {
          setEditing(!editing);

          if (editing) {
            onSave();
          }
        }}
      />

      <Modal
        onClose={() => setOpenDelete(false)}
        onOpen={() => setOpenDelete(true)}
        open={openDelete}
        size="tiny"
        dimmer="blurring"
        trigger={
          <Button
            icon="trash"
            negative
            compact
            onClick={() => setOpenDelete(true)}
          />
        }
      >
        <Modal.Header style={{ display: "flex", justifyContent: "center" }}>
          Are you sure you want to delete this review?
        </Modal.Header>
        <Modal.Actions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            content="Cancle"
            icon="cancel"
            onClick={() => setOpenDelete(false)}
          />
          <Button
            content="Delete"
            icon="trash"
            negative
            onClick={async () => {
              await fetch(`/api/reviews/${review.id}/delete`, {
                method: "DELETE",
              });
              window.location.reload();
            }}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ReviewCard;
