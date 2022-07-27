import { Session } from "next-auth";
import { Container, Segment, Tab } from "semantic-ui-react";
import { User } from "modules/Account/types";
import AccountSettings from "modules/Account/components/AccountSettings";
import LocationsAdded from "modules/Account/components/LocationsAdded";
import Reviews from "modules/Account/components/Reviews";

const Account = ({ user }: { user: User }) => {
  return (
    <Container fluid style={{ padding: 50 }}>
      <Tab
        menu={{
          fluid: true,
          vertical: true,
          tabular: false,
        }}
        panes={[
          {
            menuItem: "Account Settings",
            render: () => <AccountSettings user={user} />,
          },
          {
            menuItem: "Locations Added",
            render: () => <LocationsAdded user={user} />,
          },
          {
            menuItem: "Reviews",
            render: () => <Reviews user={user} />,
          },
        ]}
      />
    </Container>
  );
};

export default Account;
