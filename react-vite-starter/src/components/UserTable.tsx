import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useAppDispatch, useAppSelector } from "../apps/hooks";
import { fetchListUser, IUser } from "../redux/user/user.slide";
import Button from "react-bootstrap/esm/Button";
import Stack from "react-bootstrap/esm/Stack";
import CreateUpdateModal from "./UserModal/CreateUpdateModal";
import DeleteModal from "./UserModal/DeleteModal";

function BasicExample() {
  // const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/users");
  //       const data = await response.json();
  //       console.log(data);
  //       setUsers(data);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);
  const [isCreateUpdate, setIsCreateUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState<IUser>({
    name: "",
    id: 0,
    email: "",
  });

  const openCreateModal = () => {
    setIsModalOpen(true);
    setIsCreateUpdate(true);
  };

  const openUpdateModal = (user: IUser) => {
    setIsModalOpen(true);
    setIsCreateUpdate(false);
    setUser(user);
  };

  const openDeleteModal = (userId: number) => {
    setIsModalDeleteOpen(true);
    setUserId(userId);
  };

  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user456.listUser);
  useEffect(() => {
    dispatch(fetchListUser());
  }, []);

  return (
    <>
      {/* Header */}
      <Stack direction="horizontal" className="justify-content-between py-3">
        <h3>Table User</h3>
        <Button
          className="px-5"
          variant="primary"
          onClick={() => openCreateModal()}
        >
          Add
        </Button>
      </Stack>
      {/* Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: IUser) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button
                  variant="warning"
                  style={{ marginRight: "20px", paddingInline: "20px" }}
                  onClick={() => openUpdateModal(user)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => openDeleteModal(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create Update */}
      <CreateUpdateModal
        isCreate={isCreateUpdate}
        isOpen={isModalOpen}
        user={user}
        onClose={() => setIsModalOpen(false)}
      />
      {/* Create Update */}
      <DeleteModal
        isOpen={isModalDeleteOpen}
        userId={userId}
        onClose={() => setIsModalDeleteOpen(false)}
      />
    </>
  );
}

export default BasicExample;
