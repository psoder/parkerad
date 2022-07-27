import { User } from "modules/Account/types";
import { Tab, Table } from "semantic-ui-react";
import LocationRow from "./LocationRow";

const LocationsAdded = ({ user }: { user: User }) => {
  return (
    <Tab.Pane>
      <h1>Locations Added</h1>
      <Table definition compact>
        <Table.Header fullWidth>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Image</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>No. Reviews</Table.HeaderCell>
          <Table.HeaderCell>Avg. Rating</Table.HeaderCell>
          <Table.HeaderCell>Coordinates</Table.HeaderCell>
          <Table.HeaderCell>Date Added</Table.HeaderCell>
        </Table.Header>
        {user.locationsAdded.map((location) => {
          return <LocationRow location={location} />;
        })}
      </Table>
    </Tab.Pane>
  );
};

export default LocationsAdded;
