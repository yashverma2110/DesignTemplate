import { Box, Divider, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./EnquireSection.css";

const EnquireSection = () => {
  return (
    <Box>
      <Divider variant="middle" />
      <Grid container className="text-section">
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Typography variant="h6" className="enq-title">
            {" "}
            ENQUIRE
          </Typography>
          <br />
          <Typography paragraph className="enq-details">
            {" "}
            IF YOU WOULD LIKE TO DISCUSS YOUR PROJECT OR SCHEDULE AN APPOINTMENT
            WITH OUR TEAM, EITHER IN PERSON OR VIRTUALLY, PLEASE{" "}
            <Link to="/enquire" className="link">
              CONTACT US
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <Divider variant="middle" />
    </Box>
  );
};

export default EnquireSection;
