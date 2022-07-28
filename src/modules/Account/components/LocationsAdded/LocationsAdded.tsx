import { Tab, Table } from "semantic-ui-react";
import LocationRow from "./LocationRow";
import { UserContext } from "pages/account";
import { useContext } from "react";

const LocationsAdded = () => {
  const user = useContext(UserContext);

  return (
    <Tab.Pane>
      <h1>Locations Added</h1>
      <Table definition compact>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>No. Reviews</Table.HeaderCell>
            <Table.HeaderCell>Avg. Rating</Table.HeaderCell>
            <Table.HeaderCell>Coordinates</Table.HeaderCell>
            <Table.HeaderCell>Date Added</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {user?.locationsAdded.map((location) => {
            return <LocationRow key={location.id} location={location} />;
          })}
        </Table.Body>
      </Table>
    </Tab.Pane>
  );
};

export default LocationsAdded;
