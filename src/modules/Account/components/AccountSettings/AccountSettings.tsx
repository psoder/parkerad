import { Tab } from "semantic-ui-react";
import { useSession } from "next-auth/react";
import { UserContext } from "pages/account";
import { useContext } from "react";

const AccountSettings = () => {
  const { data: session } = useSession();
  const user = useContext(UserContext);

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
