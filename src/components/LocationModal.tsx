import ReviewCard from "components/ReviewCard";
import Link from "next/link";
import { ReactNode, useState } from "react";
import {
  Card,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  Modal,
  Rating,
  Segment,
} from "semantic-ui-react";
import { LocationReview } from "types/LocationReview";
import * as utils from "utils/LocationReviewUtils";
import LeaveReview from "components/LeaveReview";

const LocationModal = ({
  location,
  trigger,
}: {
  location: LocationReview;
  trigger: ReactNode;
}) => {
  const reviews = location.reviews;
  const lat = location.coordinates?.coordinates[0];
  const long = location.coordinates?.coordinates[1];
  const mapLink = `https://maps.google.com/?q=${lat},${long}`;

  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
      closeIcon
      dimmer="blurring"
    >
      <Modal.Header>
        <Header size="large">{location.locationName}</Header>
      </Modal.Header>

      <Modal.Content scrolling>
        <Grid>
          <Grid.Column width={8}>
            <Segment>
              <Modal.Description style={{ gridArea: "titleDescription" }}>
                <Container fluid>
                  <Header size="huge" className="locationName">
                    {location.locationName}
                  </Header>

                  <p className="description">
                    {location.description != null ? (
                      <>{location.description}</>
                    ) : (
                      "No description available."
                    )}
                    <br />
                    View on{" "}
                    <Link href={mapLink}>
                      <a target={"_blank"}>map</a>
                    </Link>
                    .
                  </p>
                </Container>
              </Modal.Description>
            </Segment>

            <Container content={<LeaveReview location={location} />} />
          </Grid.Column>

          <Grid.Column width={8}>
            <Segment content={<Image fluid src={location.image} />} />
          </Grid.Column>
        </Grid>

        <Segment>
          <Header
            size="huge"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Reviews ({reviews.length}){" "}
            <Rating
              defaultRating={utils.averageRating(location)}
              maxRating={5}
              disabled
              icon="star"
              size="massive"
            />
          </Header>

          <Divider />

          <Card.Group>
            {reviews.map((review) => {
              return (
                <ReviewCard
                  key={review.id}
                  review={review}
                  user={review.user}
                />
              );
            })}
          </Card.Group>
        </Segment>
      </Modal.Content>
    </Modal>
  );
};

export default LocationModal;
