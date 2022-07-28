import { Container, Segment, Tab } from "semantic-ui-react";
import AccountSettings from "modules/Account/components/AccountSettings";
import LocationsAdded from "modules/Account/components/LocationsAdded";
import Reviews from "modules/Account/components/Reviews";

const Account = () => {
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
            render: () => <AccountSettings />,
          },
          {
            menuItem: "Locations Added",
            render: () => <LocationsAdded />,
          },
          {
            menuItem: "Reviews",
            render: () => <Reviews />,
          },
        ]}
      />
    </Container>
  );
};

export default Account;
