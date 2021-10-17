import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Dispatch } from "react";
import { useHistory } from "react-router";
import { navOptions } from "../../utils/constants";
import {
  getAuthToken,
  getUser,
  handleRedirectionToDash,
} from "../../utils/methods";

interface DrawerSectionProps {
  openDrawer: boolean;
  setOpenDrawer: Dispatch<React.SetStateAction<boolean>>;
}

const DrawerSection = ({ openDrawer, setOpenDrawer }: DrawerSectionProps) => {
  const history = useHistory();

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Drawer anchor="top" open={openDrawer} onClose={toggleDrawer}>
      <List>
        {navOptions.map((text, index) => (
          <ListItem button key={index}>
            <ListItemText
              primary={
                <Typography className="drawer-list-item">{text}</Typography>
              }
              onClick={() => history.push(`/${text.toLowerCase()}`)}
            />
          </ListItem>
        ))}
        {!Boolean(getAuthToken()) ? (
          <ListItem color="secondary" onClick={() => history.push("/login")}>
            <ListItemText
              primary={
                <Typography className="drawer-list-item">Login</Typography>
              }
            />
          </ListItem>
        ) : (
          <ListItem
            color="secondary"
            onClick={() => {
              localStorage.clear();
              history.push("/login");
            }}
          >
            <ListItemText
              primary={
                <Typography className="drawer-list-item">Logout</Typography>
              }
            />
          </ListItem>
        )}
        {getAuthToken() && getUser()?.[0]?.roles !== "user" ? (
          <ListItem
            color="secondary"
            onClick={() => handleRedirectionToDash(history)}
          >
            <ListItemText
              primary={
                <Typography className="drawer-list-item">Dashboard</Typography>
              }
            />
          </ListItem>
        ) : (
          <ListItem color="secondary" onClick={() => history.push("/enquire")}>
            <ListItemText
              primary={
                <Typography className="drawer-list-item">Enquire</Typography>
              }
            />
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default DrawerSection;
