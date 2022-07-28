import { ReactNode, useState } from "react";
import { Button, Modal } from "semantic-ui-react";

const DeleteReview = ({
  trigger,
  onDelete,
}: {
  trigger: ReactNode;
  onDelete: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      trigger={trigger}
      dimmer="blurring"
    >
      <Modal.Header>Delete Review</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to delete your review</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} negative>
          No
        </Button>
        <Button
          onClick={() => {
            onDelete();
            setOpen(false);
          }}
          positive
        >
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteReview;
