import {
  Button,
  Card,
  Container,
  Header,
  Image,
  Rating,
} from "semantic-ui-react";
import { LocationReview } from "types/LocationReview";
import * as utils from "utils/LocationReviewUtils";
import LocationModal from "components/LocationModal";

const LocationCard = ({ location }: { location: LocationReview }) => {
  return (
    <Card image>
      <Image
        src={location.image!}
        alt="Image of location"
        height={200}
        style={{
          objectFit: "cover",
        }}
      />

      <Card.Content>
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Header
            style={{
              margin: 0,
            }}
            content={location.locationName}
            size="large"
          />
          <Rating
            rating={utils.averageRating(location)}
            maxRating={5}
            disabled
            icon="star"
            size="large"
          />
        </Container>

        <LocationModal
          location={location}
          trigger={<Button content="More information" fluid />}
        />
      </Card.Content>
    </Card>
  );
};

export default LocationCard;
