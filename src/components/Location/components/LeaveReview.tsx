import StarBar from "components/StarBar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { stdPx } from "theme/Styles";
import type { Location } from "@prisma/client";

const LeaveReview = ({ location }: { location: Location }) => {
  const { status } = useSession();
  const [state, setState] = useState<{
    rating: number;
    comment?: string;
  }>({ rating: 0 });

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    fetch("/api/reviews/create", {
      method: "POST",
      body: JSON.stringify({
        ...state,
        locationId: location.id,
      }),
    }).then(() => {
      window.location.reload();
    });
  };

  let content = <></>;
  if (status === "authenticated") {
    content = (
      <>
        <h2>Leave a review</h2>
        <form onSubmit={handleSubmit}>
          <StarBar
            editable={true}
            onChange={(value: number) => {
              setState({ ...state, rating: value });
            }}
          />

          <label>
            Comment (Optional)
            <input
              type="text"
              value={state?.comment || ""}
              onChange={handleChange}
              name="comment"
            />
          </label>

          <input type="submit" value="Submit" />
        </form>

        <style jsx>{`
          h2 {
            margin: 0;
            margin-bottom: ${stdPx(0.5)};
          }

          form {
            display: flex;
            flex-direction: column;
          }

          label {
            display: flex;
            flex-direction: column;
          }
        `}</style>
      </>
    );
  } else {
    content = (
      <h2>
        <Link href={"/api/auth/signin"}>
          <a>Sign in</a>
        </Link>{" "}
        to leave a review!
      </h2>
    );
  }

  return (
    <div
      style={{
        marginLeft: stdPx(2),
      }}
    >
      {content}
    </div>
  );
};

export default LeaveReview;
