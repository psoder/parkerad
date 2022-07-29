import { useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode, useRef, useState } from "react";
import {
  Button,
  Form,
  Header,
  Icon,
  Image,
  Modal,
  Segment,
} from "semantic-ui-react";
import { uploadImage } from "utils/APIUtils";
import { isValidCoordinate } from "utils/LocationUtils";

const AddLocation = ({ trigger }: { trigger: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { status } = useSession();
  const [locationName, setLocationName] = useState("");
  const [description, setDescription] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });

  const [image, setImage] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: any) => {
    event?.preventDefault();

    let imageKey: string | null = null;
    if (image) {
      imageKey = await uploadImage(image).then((key) => {
        return key;
      });
      console.log(imageKey);
    }

    // Create location
    await fetch("/api/locations/create", {
      method: "POST",
      body: JSON.stringify({
        locationName: locationName,
        description: description,
        latitud: coordinates.latitude,
        longitude: coordinates.longitude,
        image: imageKey,
      }),
    }).then((res) => {
      return res.json();
    });

    window.location.reload();
  };

  if (status !== "authenticated") {
    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={trigger}
      >
        <Modal.Header>Add a location</Modal.Header>
        <Modal.Content>You must be signed in to add a location.</Modal.Content>
        <Modal.Actions>
          <Button
            icon="cancel"
            content="Cancel"
            negative
            onClick={() => setOpen(false)}
          />
          <Link href="/api/auth/signin">
            <Button icon="sign in" positive content="Sign in" />
          </Link>
        </Modal.Actions>
      </Modal>
    );
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
      dimmer="blurring"
    >
      <Modal.Header>
        <Header size="large">Add a location</Header>
      </Modal.Header>

      <Modal.Content scrolling>
        <Form>
          <Form.Input
            required
            label="Location name"
            value={locationName}
            onChange={(_, { value }) => setLocationName(value)}
          />

          <Form.TextArea
            label="Description"
            value={description}
            onChange={(_, { value }) => setDescription(`${value}`)}
          />

          <Form.Group widths="equal">
            <Form.Input
              label="Latitude"
              type="number"
              error={!isValidCoordinate(+coordinates.latitude)}
              value={coordinates?.latitude || ""}
              onChange={(_, { value }) =>
                setCoordinates({ ...coordinates, latitude: value })
              }
            />
            <Form.Input
              label="Longitude"
              type="number"
              error={!isValidCoordinate(+coordinates.longitude)}
              value={coordinates?.longitude || ""}
              onChange={(_, { value }) =>
                setCoordinates({ ...coordinates, longitude: value })
              }
            />
          </Form.Group>

          <Segment placeholder={image == undefined}>
            {image ? (
              <Image src={URL.createObjectURL(image!)} rounded />
            ) : (
              <>
                <Header icon>
                  <Icon name="file image outline" />
                  No image selected.
                </Header>
                <Button
                  primary
                  onClick={async () => inputRef.current?.click()}
                  content="Upload Image"
                />
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setImage(e.target.files![0]);
                  }}
                />
              </>
            )}
          </Segment>
        </Form>
      </Modal.Content>

      <Modal.Actions>
        {image && (
          <Button
            icon="repeat"
            content="Reset image"
            onClick={() => setImage(undefined)}
          />
        )}
        <Button
          icon="cancel"
          negative
          content="Cancel"
          onClick={() => setOpen(false)}
        />
        <Button
          icon="check"
          positive
          content="Add location"
          onClick={(e) => handleSubmit(e)}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default AddLocation;
