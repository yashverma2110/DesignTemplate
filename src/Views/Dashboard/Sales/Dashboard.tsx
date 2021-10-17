import { Dispatch, useState } from "react";
import Header from "../../../Components/Header/Header";
import {
  Box,
  Typography,
  Button,
  Modal,
  Divider,
  Card,
  CardContent,
  CardHeader,
  CardActions,
} from "@material-ui/core";
import TableComponent from "../../../Components/TableComponent/TableComponent";
import { leadForm, salesGridView } from "./metadata";
import FormGenerator from "../../../Components/FormGenerator";
import { client } from "../../../utils/api.config";
import { useHistory } from "react-router-dom";
import { getUser } from "../../../utils/methods";

interface SalesDashboardProps {
  setMessage: Dispatch<any>;
}

const SalesDashboard = ({ setMessage }: SalesDashboardProps) => {
  const history = useHistory();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>();

  const getFormData = (data: any) => {
    setFormData(data);
  };

  const handleSubmit = (e: any) => {
    client
      .post("/customer/enquire", {
        ...formData,
        added_by: getUser()?.[0]?.name ?? "Anonymous",
      })
      .then((res) => {
        setMessage({
          open: true,
          msg: "Refresh to see the changes",
          severity: "success",
        });
      });
  };

  const handleClickOfRow = (data: any) => {
    history.push(`/customer/${data.id}`);
  };

  return (
    <div>
      <Header />
      <Box className="title-container">
        <Typography variant="h3" className="title-co">
          Sales & Leads
        </Typography>
        <Box className="fl-ce title-button-container">
          <Button
            color="primary"
            variant="contained"
            onClick={() => setOpenModal(true)}
          >
            Add a new lead
          </Button>
        </Box>
      </Box>
      <Divider variant="middle" />
      <TableComponent
        metadata={salesGridView}
        dashboardType="customer"
        onRowClick={handleClickOfRow}
      />
      <Modal
        open={Boolean(openModal)}
        onClose={() => setOpenModal(false)}
        className="modal-parent"
      >
        <Card style={{ width: "350px" }}>
          <CardHeader title="Add lead" />
          <CardContent>
            <FormGenerator metadata={leadForm} getFormData={getFormData} />
          </CardContent>
          <CardActions>
            <Button onClick={handleSubmit}>Add</Button>
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};

export default SalesDashboard;
