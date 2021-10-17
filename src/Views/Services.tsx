import Header from "../Components/Header/Header";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { services } from "../utils/constants";
import "./styles/Service.css";
import { Fade } from "react-awesome-reveal";

const Services = () => {
  return (
    <div>
      <Header />
      <Box className="title-container">
        <Typography variant="h3" className="title-co">
          Services
        </Typography>
        <Typography paragraph className="desc-co">
          CLIENTS ARE OUR ASSETS AND IT IS OUR ENDEVOUR TO MAKE THEIR DREAM HOME
          BECOME A REALITY WITH OUR BEST OF DEDICATED DESIGNERS AND THE
          EXECUTION EXPERTS{" "}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box className="service-parent">
        <Grid container className="services-container">
          {services.map((service, index) => (
            <Grid key={index} item xs={12} md={4} className="grid-item-ser">
              <Fade>
                <Card elevation={3} className="service-card">
                  <Box>
                    <CardMedia image={service.imgSrc} className="service-img" />
                    <CardContent>
                      <Typography paragraph className="service-desc">
                        {service.desc}
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardHeader
                    title={
                      <Box>
                        {service.title.split("").map((text, index) => (
                          <Typography
                            key={index}
                            className="service-title-item"
                          >
                            {text}
                          </Typography>
                        ))}
                      </Box>
                    }
                    className="service-title"
                  />
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Services;
