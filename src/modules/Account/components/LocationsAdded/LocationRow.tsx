import { Location } from "modules/Account/types";
import { useState } from "react";
import { Button, Icon, Image, Input, Label, Table } from "semantic-ui-react";
import { format } from "date-fns";

const LocationRow = ({ location }: { location: Location }) => {
  const [editing, setEditing] = useState(false);
  const [state, setState] = useState({
    locationName: location.locationName,
    description: location.description,
    latitude: location.coordinates.coordinates[0],
    longitude: location.coordinates.coordinates[1],
  });

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const isValidCoordinate = (cord: number) => cord <= 180 && cord >= -180;

  return (
    <Table.Row>
      <Table.Cell>
        <Button
          icon
          fluid
          onClick={() => {
            setEditing(!editing);
          }}
        >
          <Icon name={editing ? "save" : "edit"} />
        </Button>
      </Table.Cell>
      <Table.Cell>
        {location.image ? (
          <Image
            src={`https://parkerad-images.s3.eu-north-1.amazonaws.com/${location.image}`}
            size="tiny"
            centered
          />
        ) : (
          <Button compact fluid>
            Uppload Image
          </Button>
        )}
      </Table.Cell>
      <Table.Cell>
        {editing ? (
          <Input fluid value={state.locationName} onChange={handleChange}>
            <input name="locationName" />
          </Input>
        ) : (
          state.locationName
        )}
      </Table.Cell>
      <Table.Cell>
        {editing ? (
          <Input fluid value={state.description}>
            <input name="description" onChange={handleChange} />
          </Input>
        ) : (
          state.description || "No description available."
        )}
      </Table.Cell>
      <Table.Cell>{location.reviews.length}</Table.Cell>
      <Table.Cell>
        {location.reviews
          .map((rev) => rev.rating)
          .reduce((acc, curr) => {
            return acc + curr;
          }, 0) / location.reviews.length || "-"}
      </Table.Cell>
      <Table.Cell>
        {editing ? (
          <>
            <Input
              fluid
              value={state.latitude}
              placeholder="Latitude"
              type="number"
              error={!isValidCoordinate(state.latitude)}
            >
              <input name="latitude" onChange={handleChange} />
            </Input>
            <Input
              fluid
              type="number"
              value={state.longitude}
              placeholder="Longitude"
              error={!isValidCoordinate(state.latitude)}
            >
              <input name="longitude" onChange={handleChange} />
            </Input>
          </>
        ) : (
          <>
            {state.latitude}
            {", "}
            {state.longitude}
          </>
        )}
      </Table.Cell>
      <Table.Cell>
        {format(new Date(location.dateAdded), "dd-MM-yyyy")}
      </Table.Cell>
    </Table.Row>
  );
};

export default LocationRow;
