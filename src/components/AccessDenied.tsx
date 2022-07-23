import { signIn } from "next-auth/react";

export default function AccessDenied({
  toMessage = "view this page",
}: {
  toMessage?: string;
}) {
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        <a
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          You must be signed in to {toMessage}
        </a>
      </p>
    </>
  );
}
