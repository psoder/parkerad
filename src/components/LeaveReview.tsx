import type { Location } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Card, Form, Rating } from "semantic-ui-react";

const LeaveReview = ({ location }: { location: Location }) => {
  const { status } = useSession();
  const [state, setState] = useState<{
    rating: number;
    comment?: string;
  }>({ rating: 0 });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (state.rating > 0) {
      await fetch("/api/reviews/create", {
        method: "POST",
        body: JSON.stringify({
          ...state,
          locationId: location.id,
        }),
      }).then(() => {
        window.location.reload();
      });
    }
  };

  if (status !== "authenticated") {
    return (
      <Card>
        <Card.Content>
          <Card.Header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            Leave a review
          </Card.Header>
          <Link href={"/api/auth/signin"}>Sign in</Link> to leave a review.
        </Card.Content>
      </Card>
    );
  }

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          Leave a review
          <Rating
            maxRating={5}
            icon="star"
            size="huge"
            clearable
            rating={state.rating}
            onRate={(_, { rating }) => {
              setState({ ...state, rating: rating as number });
            }}
          />
        </Card.Header>

        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Comment"
            type="text"
            value={state?.comment || ""}
            onChange={(_, { value }) => setState({ ...state, comment: value })}
          />

          <Form.Button type="submit" fluid>
            Submit
          </Form.Button>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default LeaveReview;
