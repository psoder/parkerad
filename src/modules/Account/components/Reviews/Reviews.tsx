import StarBar from "components/StarBar";
import { Tab } from "semantic-ui-react";
import { User } from "modules/Account/types";

const Reviews = ({ user }: { user: User }) => {
  return (
    <Tab.Pane>
      <h1>Reviews</h1>
      {user.reviews.map((review) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: 350,
            }}
            className="item"
          >
            {review.location.locationName}
            <StarBar initalStars={review.rating} />
          </div>
        );
      })}
    </Tab.Pane>
  );
};

export default Reviews;
