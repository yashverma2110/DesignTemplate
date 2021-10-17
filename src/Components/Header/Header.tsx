import { useState } from "react";
import {
  makeStyles,
  Grid,
  Box,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import "./Header.css";
import { useHistory } from "react-router";
import {
  getAuthToken,
  getUser,
  handleRedirectionToDash,
} from "../../utils/methods";
import DrawerSection from "../Drawer/Drawer";
import { logos } from "../../assets/urls";

const Header = () => {
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
            <Button
              color="secondary"
              onClick={() => history.push("/philosophy")}
            >
              <Typography className="nav-item">Philosophy</Typography>
            </Button>
            <Button color="secondary" onClick={() => history.push("/gallery")}>
              <Typography className="nav-item">Gallery</Typography>
            </Button>
            <Button color="secondary" onClick={() => history.push("/services")}>
              <Typography className="nav-item">Services</Typography>
            </Button>
          </Box>
        </Grid>
        <Grid item md={2}>
          <div className="logo-med" onClick={() => history.push("/")}>
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
              <Typography className="nav-item">Team</Typography>
            </Button>

            <Button
              color="secondary"
              onClick={() => history.push("/testimonials")}
            >
              <Typography className="nav-item">Testimonials</Typography>
            </Button>
            {getAuthToken() && getUser()?.[0]?.roles !== "user" ? (
              <Button
                color="secondary"
                onClick={() => handleRedirectionToDash(history)}
              >
                <Typography className="nav-item">DASHBOARD</Typography>
              </Button>
            ) : (
              <Button
                color="secondary"
                onClick={() => history.push("/enquire")}
              >
                <Typography className="nav-item">Enquire</Typography>
              </Button>
            )}
            {!Boolean(getAuthToken()) ? (
              <Button color="secondary" onClick={() => history.push("/login")}>
                <Typography className="nav-item">Login</Typography>
              </Button>
            ) : (
              <>
                <Button
                  color="secondary"
                  onClick={(e) => setMenuAnchor(e.target)}
                >
                  <Typography className="nav-item">
                    {getUser()?.[0].name}
                  </Typography>
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
            <MenuIcon color="primary" />
          </IconButton>
        </Grid>
        <Grid item xs={8}>
          <div className="logo-med" onClick={() => history.push("/")}>
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
      <div style={{ height: "50px" }}>
        <div className={classes.desktop}>{getDesktopNav()}</div>
        <div className={classes.mobile}>{getMobileNav()}</div>
      </div>
      <DrawerSection openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>
  );
};

export default Header;

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
