import React, { ReactNode, useRef, useState } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { uploadImage } from "utils/APIUtils";
import { Location } from "modules/Account/types";

const UploadImage = ({
  trigger,
  location,
}: {
  trigger: ReactNode;
  location: Location;
}) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async () => {
    if (image) {
      console.log(image);

      const key = await uploadImage(image);

      await fetch(`/api/locations/${location.id}/update`, {
        method: "PUT",
        body: JSON.stringify({ imageUrl: key }),
      }).then(console.log);
    }
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
      dimmer="blurring"
    >
      <Modal.Header>Upload an Image</Modal.Header>

      <Modal.Content image>
        <Image
          size="big"
          src={image ? URL.createObjectURL(image!) : "/images/bench.jpg"}
          wrapped
        />

        <Modal.Description>
          <Header>Select an image</Header>
          <>
            <Button
              fluid
              onClick={() => {
                inputRef.current?.click();
              }}
            >
              {image?.name ?? "Select file"}
            </Button>
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
          {image && (
            <Button
              style={{ marginTop: 10 }}
              fluid
              onClick={() => {
                setImage(undefined);
              }}
            >
              Clear selection
            </Button>
          )}
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancle
        </Button>

        <Button
          content="Upload"
          labelPosition="right"
          icon="checkmark"
          onClick={async () => {
            await handleImageUpload();
            setOpen(false);
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default UploadImage;
