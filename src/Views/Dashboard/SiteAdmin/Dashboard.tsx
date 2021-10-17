import { Dispatch, useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  Modal,
  Typography,
} from "@material-ui/core";
import Header from "../../../Components/Header/Header";
import { client } from "../../../utils/api.config";
import { DesignerCard } from "../../../Components/Carousel/CarouselDisplay";
import FormGenerator from "../../../Components/FormGenerator";
import { categoryMetadata, memeberForm, testimonialMetadata } from "./metadata";
import { getAuthToken } from "../../../utils/methods";
import PortfolioHandler from "../../../Components/Portfolio/PortfolioHandler";
import { TeamCard } from "../../Team";
import { TestimonialCard } from "../../Testimonials";
import "./Site.css";

type mutationType = "designer" | "team" | "portfolio" | "testimonial" | false;

interface SiteAdminProps {
  setMessage: Dispatch<any>;
}

const SiteAdmin = ({ setMessage }: SiteAdminProps) => {
  const classes = useStyles();
  const [designers, setDesigners] = useState<any[]>([]);
  const [team, setTeams] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState<mutationType>(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const getMembers = useCallback(() => {
    client.get("/designer/getAll").then((res) => {
      setDesigners(res.data.designers);
    });

    client.get("/team/getAll").then((res) => {
      setTeams(res.data.team);
    });
  }, []);

  const getTestimonials = useCallback(() => {
    client.get("/customer/testimonial/getAll").then((res) => {
      setTestimonials(res.data.testimonials);
    });
  }, []);

  const getPortfolios = useCallback(() => {
    client.get("/portfolio/getAll").then((res) => {
      setPortfolios(res.data.portfolio);
    });
  }, []);

  useEffect(() => {
    getMembers();
    getPortfolios();
    getTestimonials();
  }, [getMembers, getPortfolios, getTestimonials]);

  const getFormData = (data: any) => {
    setFormData(data);
  };

  const handleAddMember = () => {
    client
      .post("/designer/add", formData, {
        headers: {
          Authorization: getAuthToken(),
        },
      })
      .then((res) => {
        setOpenModal(false);
        getMembers();
        setMessage({
          open: true,
          msg: "New designer added",
          severity: "success",
        });
      });
  };

  const handleAddCategory = () => {
    client
      .post("/portfolio/add", formData, {
        headers: {
          Authorization: getAuthToken(),
        },
      })
      .then((res) => {
        setOpenModal(false);
        getPortfolios();
        setMessage({
          open: true,
          msg: "New category added",
          severity: "success",
        });
      });
  };

  const handleAddTestimonial = () => {
    client
      .post("/customer/testimonial", formData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
      .then((res) => {
        setOpenModal(false);
        getTestimonials();
        setMessage({
          open: true,
          msg: "New testimonial added",
          severity: "success",
        });
      });
  };

  const getTitleForForm = () => {
    if (openModal === "designer") return "Add Designer";
    if (openModal === "team") return "Add team member";
    if (openModal === "portfolio") return "Add a new category";
    return "Add a new testimonials";
  };

  const getFormMetadata = () => {
    if (openModal === "designer" || openModal === "team") return memeberForm;
    if (openModal === "portfolio") return categoryMetadata;
    return testimonialMetadata;
  };

  const handleAddMutation = () => {
    if (openModal === "designer" || openModal === "team") {
      handleAddMember();
    } else if (openModal === "portfolio") {
      handleAddCategory();
    } else {
      handleAddTestimonial();
    }
  };

  return (
    <div>
      <Header />
      <Box className="title-container">
        <Typography variant="h3" className="title-co">
          Site Admin
        </Typography>
        <Box className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => setOpenModal("team")}
          >
            Add a team member
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => setOpenModal("designer")}
          >
            Add a new designer
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => setOpenModal("portfolio")}
          >
            Add a new portfolio category
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => setOpenModal("testimonial")}
          >
            Add a new testimonial
          </Button>
        </Box>
      </Box>
      <Divider variant="middle" />
      <Grid container>
        {["designers", "gallery", "testimonials", "team"].map(
          (anchor: string, index: number) => (
            <Grid item xs={12} md={3}>
              <Box display="flex" justifyContent="center">
                <Button
                  key={index}
                  variant="contained"
                  color="primary"
                  className="site-btn"
                >
                  <a href={`#${anchor}`} className="site-anchor">
                    {anchor}
                  </a>
                </Button>
              </Box>
            </Grid>
          )
        )}
        {designers.length > 0 && (
          <Grid item xs={12}>
            <Typography className="site-heading" id="designers">
              Designers
            </Typography>
          </Grid>
        )}
        {designers.map((designer: any, index: number) => (
          <Grid item xs={12} md={6} key={index}>
            <DesignerCard
              designer={designer}
              admin
              setMessage={setMessage}
              refreshData={getMembers}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container>
        {portfolios.length > 0 && (
          <Grid item xs={12}>
            <Typography className="site-heading" id="gallery">
              Gallery
            </Typography>
          </Grid>
        )}
        {portfolios.map((portfolio: any, index: number) => (
          <Grid item xs={12} key={index}>
            <PortfolioHandler
              name={portfolio.category}
              id={portfolio.id}
              setMessage={setMessage}
              refetchCallback={getPortfolios}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container>
        {testimonials.length > 0 && (
          <Grid item xs={12}>
            <Typography className="site-heading" id="testimonials">
              Testimonials
            </Typography>
          </Grid>
        )}
        {testimonials.map((testimonial: any, index: number) => (
          <Grid item xs={12} md={4} key={index}>
            <TestimonialCard
              testimonial={testimonial}
              admin
              refetchCallback={getTestimonials}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container>
        {team.length > 0 && (
          <Grid item xs={12}>
            <Typography className="site-heading" id="team">
              Teams
            </Typography>
          </Grid>
        )}
        {team.map((team: any, index: number) => (
          <Grid item xs={12} key={index}>
            <TeamCard team={team} admin refetchCallback={getMembers} />
          </Grid>
        ))}
      </Grid>
      <Modal
        open={Boolean(openModal)}
        onClose={() => setOpenModal(false)}
        className="modal-parent"
      >
        <Card>
          <CardHeader title={getTitleForForm()} />
          <CardContent className="modal-form-content">
            <FormGenerator
              metadata={getFormMetadata()}
              getFormData={getFormData}
              setLoadingParent={setLoading}
            />
          </CardContent>
          <CardActions>
            <Button
              onClick={handleAddMutation}
              disabled={loading}
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
};

export default SiteAdmin;

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  button: {
    margin: "10px",
  },
}));
