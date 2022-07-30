import LocationCard from "components/LocationCard";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Divider,
  Dropdown,
  Header,
  Input,
  Menu,
  Placeholder,
  Search,
  Segment,
} from "semantic-ui-react";
import { LocationReview } from "types/LocationReview";
import { Comparitor, getComparitor } from "utils/LocationReviewUtils";
import AddLocation from "./Components/AddLocation";

const Locations = ({ locations }: { locations: LocationReview[] }) => {
  const [fslocations, setFSLocations] = useState(locations);
  const [query, setQuery] = useState<{
    filter: string;
    comparitor: Comparitor;
  }>({
    filter: "",
    comparitor: "rating",
  });

  useEffect(() => {
    setFSLocations(
      locations
        .filter((location) => {
          return location.locationName
            .toLowerCase()
            .match(query.filter.toLowerCase());
        })
        .sort(getComparitor(query.comparitor))
        .reverse()
    );
  }, [query]);

  const options = [
    {
      key: "Rating",
      text: "Rating",
      value: "rating",
    },
    {
      key: "Weighted rating",
      text: "Weighted rating",
      value: "weightedRating",
    },
    {
      key: "Date added",
      text: "Date added",
      value: "dateAdded",
    },
    {
      key: "Number of ratings",
      text: "Number of ratings",
      value: "noRatings",
    },
  ];

  return (
    <Container style={{ paddingTop: "3em", paddingBottom: "3em" }} id="locations">
      <Segment raised>
        <Header size="huge">Locations</Header>
        <Menu widths={3} borderless>
          <Menu.Item>
            <Dropdown
              style={{ marginLeft: 30, marginRight: 30 }}
              fluid
              placeholder="Sort Locations"
              selection
              onChange={(_, { value }) =>
                setQuery({ ...query, comparitor: value as Comparitor })
              }
              options={options}
              defaultValue={options[0].value}
            />
          </Menu.Item>

          <Menu.Item>
            <Input
              style={{ marginLeft: 30, marginRight: 30 }}
              icon="search"
              placeholder="Search..."
              onChange={(_, { value }) => setQuery({ ...query, filter: value })}
            />
          </Menu.Item>

          <Menu.Item>
            <AddLocation
              trigger={
                <Button
                  style={{ marginLeft: 30, marginRight: 30 }}
                  fluid
                  content="Add Location"
                />
              }
            />
          </Menu.Item>
        </Menu>

        <Divider />

        <Card.Group centered>
          {fslocations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}

          {fslocations.length == 0 && (
            <Container text textAlign="center" style={{ padding: 100 }}>
              <Header>No locations match the search criteria</Header>
            </Container>
          )}
        </Card.Group>
      </Segment>
    </Container>
  );
};

export default Locations;
