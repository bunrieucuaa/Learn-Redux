import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Form from "react-bootstrap/esm/Form";
import Stack from "react-bootstrap/esm/Stack";
import Modal from "react-bootstrap/Modal";
import { createNewUser, IUser, updateUser } from "../../redux/user/user.slide";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../apps/hooks";
import { toast } from "react-toastify";

interface CreateUpdateProps {
  isCreate: boolean;
  user?: IUser;
  isOpen: boolean;
  onClose?: () => void;
}

export default function CreateUpdateModal({
  isCreate,
  user,
  isOpen,
  onClose,
}: CreateUpdateProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    if (isOpen) {
      if (isCreate) {
        setEmail("");
        setName("");
      } else if (user) {
        setEmail(user.email);
        setName(user.name);
      }
    }
  }, [isOpen, isCreate, user]);

  const dispatch = useAppDispatch();

  const submitCreateUpdate = () => {
    if (!name || !email) {
      toast.error("Empty!");
    }

    if (!user) {
      dispatch(
        createNewUser({
          name,
          email,
        }),
      );
      toast.success("Create User Succesfully");
      onClose?.();
    } else {
      dispatch(
        updateUser({
          id: user.id,
          name,
          email,
        }),
      );
      toast.success("Update User Succesfully");
      onClose?.();
    }
  };

  return (
    <>
      <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{isCreate ? "Add New User" : "Update User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="floatingName"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Email address">
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>
            <Stack
              direction="horizontal"
              gap={2}
              className="justify-content-end mt-4 pt-2"
            >
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
              <Button onClick={() => submitCreateUpdate()} variant="primary">
                {isCreate ? "Add" : "Update"}
              </Button>
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
