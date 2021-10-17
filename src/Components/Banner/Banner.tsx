import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import "./Banner.css";
import { useHistory } from "react-router";
import { Zoom } from "react-awesome-reveal";
import {
  getAuthToken,
  getUser,
  handleRedirectionToDash,
} from "../../utils/methods";
import { logos, videoBg } from "../../assets/urls";
import DrawerSection from "../Drawer/Drawer";

const Banner = () => {
  const classes = useStyles();
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<any>(null);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const getDesktopNav = () => {
    return (
      <Grid container>
        <Grid item md={5}>
          <Box className="btn-container">
            <Button color="secondary" onClick={() => history.push("/gallery")}>
              <Typography>Gallery</Typography>
            </Button>
            <Button
              color="secondary"
              onClick={() => history.push("/philosophy")}
            >
              <Typography>Philosophy</Typography>
            </Button>
            <Button color="secondary" onClick={() => history.push("/services")}>
              <Typography>Services</Typography>
            </Button>
          </Box>
        </Grid>
        <Grid item md={2}>
          <div className="logo-container" onClick={() => history.push("/")}>
            <img
              src={logos.only_logo}
              alt="transparent-logo"
              className="header-logo"
            />
            GRUHAM Ti'AMORE
          </div>
        </Grid>
        <Grid item md={5}>
          <Box className="btn-container">
            <Button color="secondary" onClick={() => history.push("/team")}>
              <Typography>Team</Typography>
            </Button>

            <Button
              color="secondary"
              onClick={() => history.push("/testimonials")}
            >
              <Typography>Testimonials</Typography>
            </Button>
            {getAuthToken() && getUser()?.[0]?.roles !== "user" ? (
              <Button
                color="secondary"
                onClick={() => handleRedirectionToDash(history)}
              >
                <Typography>Dashboard</Typography>
              </Button>
            ) : (
              <Button
                color="secondary"
                onClick={() => history.push("/enquire")}
              >
                <Typography>Enquire</Typography>
              </Button>
            )}
            {!Boolean(getAuthToken()) ? (
              <Button color="secondary" onClick={() => history.push("/login")}>
                <Typography>Login</Typography>
              </Button>
            ) : (
              <>
                <Button
                  color="secondary"
                  onClick={(e) => setMenuAnchor(e.target)}
                >
                  <Typography>{getUser()?.[0]?.name}</Typography>
                </Button>
                <Menu
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  keepMounted
                  onClose={() => setMenuAnchor(null)}
                >
                  <MenuItem
                    onClick={() => {
                      localStorage.clear();
                      history.push("/login");
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    );
  };

  const getMobileNav = () => {
    return (
      <Grid container>
        <Grid item xs={4}>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon color="secondary" />
          </IconButton>
        </Grid>
        <Grid item xs={8}>
          <div className="logo-container" onClick={() => history.push("/")}>
            <img
              src={logos.only_logo}
              alt="transparent-logo"
              className="header-logo"
            />
            GRUHAM Ti'AMORE
          </div>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <div className="fullscreen">
        <video className="fullscreen-video" loop muted autoPlay>
          <source src={videoBg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="fullscreen-nav">
          <div className={classes.desktop}>{getDesktopNav()}</div>
          <div className={classes.mobile}>{getMobileNav()}</div>
        </div>
        <div className="center-txt">
          <Zoom>
            <img
              src={logos.trans}
              alt="transparent-logo"
              className="center-logo"
            />
          </Zoom>
        </div>
      </div>
      <DrawerSection openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
};

export default Banner;

const useStyles = makeStyles((theme) => ({
  mobile: {
    display: "block",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  desktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
}));
