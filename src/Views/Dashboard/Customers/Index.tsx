import Header from "../../../Components/Header/Header";
import { Box, Typography, Divider, Paper, Button } from "@material-ui/core";
import FormGenerator from "../../../Components/FormGenerator";
import { userFormMetadata } from "./metatdata";
import { useEffect, useState } from "react";
import { client } from "../../../utils/api.config";
import { getAuthToken } from "../../../utils/methods";
import "./customerForm.css";

const UserForm = ({ setMessage }: any) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const user_id = window.location.pathname.split("/")[2];

    client
      .get(`/customer/${user_id}`, {
        headers: {
          Authorization: getAuthToken(),
        },
      })
      .then((res) => {
        setFormData(res.data.user);
      });
  }, []);

  const getFormData = (data: any) => {
    setFormData(data);
  };

  const handleMutationOfCustomer = () => {
    const user_id = window.location.pathname.split("/")[2];

    client.put(`/customer/update/${user_id}`, formData, {
      headers: {
        Authorization: getAuthToken(),
      },
    });
  };

  return (
    <div>
      <Header />
      <Box className="title-container">
        <Typography variant="h3" className="title-co">
          Customer
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box className="fl-ce user-form-container">
        <Paper elevation={3} className="user-form">
          <FormGenerator
            metadata={userFormMetadata}
            getFormData={getFormData}
            initialData={formData}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleMutationOfCustomer}
          >
            Submit
          </Button>
        </Paper>
      </Box>
    </div>
  );
};

export default UserForm;
