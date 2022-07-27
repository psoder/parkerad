import { Tab } from "semantic-ui-react";
import { User } from "modules/Account/types";
import { useSession } from "next-auth/react";

const AccountSettings = ({ user }: { user: User }) => {
  const { data: session } = useSession();
  return (
    <Tab.Pane>
      <h1>Account Settings</h1>
      Content Hello {session?.user?.name}, your account id is{" "}
      <code>{session?.user.id}</code>. Your account is a{" "}
      <code>{session?.user.role}</code> account.
    </Tab.Pane>
  );
};

export default AccountSettings;
