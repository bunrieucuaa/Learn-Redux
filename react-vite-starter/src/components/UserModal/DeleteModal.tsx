import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/esm/Form";
import Stack from "react-bootstrap/esm/Stack";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../apps/hooks";
import { deleteUser } from "../../redux/user/user.slide";

interface DeleteModalProps {
  userId: number;
  isOpen: boolean;
  onClose?: () => void;
}

function DeleteModal({ userId, isOpen, onClose }: DeleteModalProps) {
  const dispatch = useAppDispatch();
  const submitDelete = () => {
    if (!userId) {
      toast.error("User Dont exist lol!!");
      onClose?.();
    } else {
      dispatch(deleteUser(userId));
      toast.success("Delete User Succesfully");
      onClose?.();
    }
  };

  return (
    <>
      <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <h3>Do you want to delete this user?</h3>
            <Stack
              direction="horizontal"
              gap={2}
              className="justify-content-end mt-4 pt-2"
            >
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
              <Button onClick={() => submitDelete()} variant="primary">
                Delete
              </Button>
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteModal;
