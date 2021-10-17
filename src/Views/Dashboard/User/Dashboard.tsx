import { Dispatch, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from "@material-ui/core";
import Header from "../../../Components/Header/Header";
import "./User.css";
import { addUserMetadata, usersGridView } from "./metadata";
import FormGenerator from "../../../Components/FormGenerator";
import { client } from "../../../utils/api.config";
import TableComponent from "../../../Components/TableComponent/TableComponent";
import { getAuthToken } from "../../../utils/methods";

interface UserDashboardProps {
  setMessage: Dispatch<any>;
}

const UserDashboard = ({ setMessage }: UserDashboardProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [refreshFlag, setRefreshFlag] = useState<any>();

  const submitForm = () => {
    if (!Boolean(selectedUser)) {
      client
        .post("/user/signup", formData)
        .then(() => {
          setRefreshFlag(new Date());
          setMessage({
            open: true,
            msg: "New user added",
            severity: "success",
          });
        })
        .catch(() => {
          setMessage({
            open: true,
            msg: "Try again later",
            severity: "error",
          });
        });
    } else {
      client
        .put("/user", formData, {
          headers: {
            Authorization: getAuthToken(),
          },
        })
        .then(() => {
          setRefreshFlag(new Date());
          setMessage({
            open: true,
            msg: "User updated",
            severity: "success",
          });
        })
        .catch(() => {
          setMessage({
            open: true,
            msg: "Try again later",
            severity: "error",
          });
        });
    }
  };

  const deleteUser = () => {
    client
      .delete(`/user/${selectedUser.id}`, {
        headers: {
          Authorization: getAuthToken(),
        },
      })
      .then(() => {
        setRefreshFlag(new Date());
        setMessage({
          open: true,
          msg: "User deleted",
          severity: "success",
        });
      })
      .catch(() => {
        setMessage({
          open: true,
          msg: "Try again later",
          severity: "error",
        });
      });
  };

  const toggleModal = () => {
    setOpenModal(!openModal);
    if (openModal === false) {
      setSelectedUser(null);
    }
  };

  const getFormData = (data: any) => {
    setFormData(data);
  };

  const handleRowClick = (data: any) => {
    toggleModal();
    setSelectedUser(data);
  };

  return (
    <div>
      <Header />
      <Box className="title-container">
        <Typography variant="h3" className="title-co">
          Users
        </Typography>
        <Box className="fl-ce title-button-container">
          <Button color="primary" variant="contained" onClick={toggleModal}>
            Add a new user
          </Button>
        </Box>
      </Box>
      <Divider variant="middle" />
      <Box>
        <TableComponent
          metadata={usersGridView}
          dashboardType="users"
          onRowClick={handleRowClick}
          refresh={refreshFlag}
        />
      </Box>
      <Modal open={openModal} onClose={toggleModal} className="modal-parent">
        <Card className="modal-form-content">
          <CardHeader title="Add Designer" />
          <CardContent>
            <FormGenerator
              metadata={addUserMetadata}
              getFormData={getFormData}
              initialData={selectedUser}
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={submitForm}>
              Submit
            </Button>
            {Boolean(selectedUser) && (
              <Button variant="contained" color="primary" onClick={deleteUser}>
                Delete
              </Button>
            )}
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};

export default UserDashboard;
