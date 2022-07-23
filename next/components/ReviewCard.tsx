import { Review, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { colors, shadows } from "theme/Styles";
import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";
import StarBar from "./StarBar";

const ReviewCard = ({ review, user }: { review: Review; user: User }) => {
  const fontSize = 1.5;
  const { status } = useSession();
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState<string>(review?.comment ?? "");

  return (
    <>
      <div className="review">
        <StarBar
          initalStars={rating}
          size={`${fontSize}rem`}
          editable={editing}
          onChange={(newRating) => {
            setRating(newRating);
          }}
        />

        {editing ? (
          <label>
            Comment
            <input
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </label>
        ) : review.comment != null ? (
          <p className="comment">
            <i>&quot;{review.comment}&quot;</i>
          </p>
        ) : (
          <></>
        )}

        <i className="username">- {user.name}</i>

        <div>
          <>Reviewd on the {review.reviewDate}</>
          <>
            {review.editDate != null ? <>(edited: {review.editDate})</> : <></>}
          </>
        </div>

        {status === "authenticated" && (
          <div className="buttons">
            <EditButton
              onEdit={() => {
                setEditing(true);
              }}
              onSave={async () => {
                setEditing(false);
                if (
                  rating != review.rating ||
                  comment != (review.comment ?? "")
                ) {
                  await fetch(`/api/reviews/${review.id}/edit`, {
                    method: "PUT",
                    body: JSON.stringify({
                      reviewId: review.id,
                      rating: rating,
                      comment: comment == "" ? null : comment,
                    }),
                  });
                  window.location.reload();
                }
              }}
            />
            <DeleteButton
              onClick={async () => {
                await fetch(`/api/reviews/${review.id}/delete`, {
                  method: "DELETE",
                });
                window.location.reload();
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        .review {
          opacity: 90%;
          background-color: ${colors.primary};
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1rem;
          box-shadow: ${shadows.boxShadow};
          position: relative;
        }

        .comment {
          font-size: ${fontSize}rem;
          margin: 0;
        }

        .username {
          font-size: ${0.9 * fontSize}rem;
        }

        .buttons {
          position: absolute;
          top: 8px;
          right: 8px;
          display: flex;
        }
      `}</style>
    </>
  );
};

export default ReviewCard;
