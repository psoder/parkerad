import { Review, User } from "@prisma/client";
import { colors, shadows } from "theme/Styles";
import StarBar from "./StarBar";

const ReviewCard = ({
  review,
  user,
  editable = false,
}: {
  review: Review;
  user: User;
  editable?: boolean;
}) => {
  const fontSize = 1.5;

  return (
    <>
      <div className="review">
        <StarBar initalStars={review.rating} size={`${fontSize}rem`} />

        {review.comment != null ? (
          <p className="comment">
            <i>&quot;{review.comment}&quot;</i>
          </p>
        ) : (
          <></>
        )}

        <div>
          <i className="username">- {user.username}</i>
        </div>

        <div>
          Reviewd on the {review.reviewDate}
          {review.editDate != null ? <>(edited: {review.editDate})</> : <></>}
        </div>

        <button hidden={!editable}>edit</button>
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
        }

        .comment {
          font-size: ${fontSize}rem;
          margin: 0;
        }

        .username {
          font-size: ${0.9 * fontSize}rem;
        }
      `}</style>
    </>
  );
};

export default ReviewCard;
