import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { logos } from "../assets/urls";
import Header from "../Components/Header/Header";
import { client } from "../utils/api.config";
import "./styles/Porfolio.css";

const Gallery = () => {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [selectedImages, setSelectedImages] = useState<any>();

  useEffect(() => {
    if (selectedImages === undefined) {
      window.scrollTo(0, 0);
    }
  }, [selectedImages]);

  useEffect(() => {
    client.get("/portfolio/getAll/true").then((res) => {
      setPortfolios(res.data.portfolio);
    });
  }, []);

  if (selectedImages === undefined)
    return (
      <div>
        <Header />
        <Box className="title-container">
          <Typography variant="h3" className="title-co">
            Gallery
          </Typography>
          <Box className="desc-co">
            <Typography>
              <i>
                "Great things are not done by one person. They're done by a team
                of people".{" "}
              </i>
              <br />
              <br />- Steve jobs
            </Typography>
          </Box>
        </Box>
        <Divider variant="middle" />
        <Grid container className="image-grid">
          {portfolios?.map((item: any, index: number) => {
            return (
              <Grid item xs={12} md={6} key={index}>
                <Fade>
                  <Box className="port-img-parent">
                    <img
                      src={item.images?.[0]?.url}
                      alt="bg-port"
                      className="image"
                    />
                    <Box className="room-txt">
                      <Paper elevation={2} className="hover-paper">
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="large"
                          onClick={() =>
                            setSelectedImages({
                              images: item.images,
                              category: item.category,
                            })
                          }
                        >
                          {item.category}
                        </Button>
                      </Paper>
                    </Box>
                  </Box>
                </Fade>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );

  return (
    <div>
      <Header />
      <Fade>
        <Box className="title-container">
          <Typography variant="h3" className="title-co">
            {selectedImages.category}
          </Typography>
        </Box>
      </Fade>
      <Divider variant="middle" />
      <Grid container className="image-grid">
        <Grid item xs={12}>
          &nbsp; &nbsp;
          <Button
            startIcon={<ArrowBack />}
            variant="outlined"
            color="primary"
            onClick={() => setSelectedImages(undefined)}
          >
            Back to Gallery
          </Button>
        </Grid>

        <Grid container>
          {selectedImages.images?.map((img: any, i: number) => (
            <Grid key={i} item xs={12} md={6} className="grid-item">
              <Fade>
                <Box className="port-img-parent">
                  <img src={img.url} alt="bg-port" className="image" />
                  <img
                    src={logos.trans}
                    alt="turq-logo"
                    className="thumbnail-logo"
                  />
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Gallery;
