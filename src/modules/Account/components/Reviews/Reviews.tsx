import StarBar from "components/StarBar";
import { Tab } from "semantic-ui-react";
import { UserContext } from "pages/account";
import { useContext } from "react";

const Reviews = () => {
  const user = useContext(UserContext);
  return (
    <Tab.Pane>
      <h1>Reviews</h1>
      {user?.reviews.map((review) => {
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
