import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import { Fade } from "react-awesome-reveal";
import { logos } from "../assets/urls";
import Header from "../Components/Header/Header";
import { client } from "../utils/api.config";
import "./styles/Team.css";
import { getAuthToken } from "../utils/methods";

interface TeamCardProps {
  team: any;
  admin?: boolean;
  refetchCallback?: any;
}

export const TeamCard = ({
  team,
  admin = false,
  refetchCallback,
}: TeamCardProps) => {
  const onDelete = (id: number) => {
    client
      .delete(`/team/delete/${id}`, {
        headers: {
          Authorization: getAuthToken(),
        },
      })
      .then(() => {
        refetchCallback!();
      });
  };

  return (
    <Card className="team-card" elevation={3}>
      <Box className="team-profile-img-container">
        <CardMedia image={team.image} className="team-profile-img" />
        <img src={logos.trans} alt="logo-trans" className="team-logo-trans" />
      </Box>
      <Box>
        <CardHeader
          title={
            <Typography variant="h5" className="member-name">
              {team.name}
            </Typography>
          }
          subheader={
            <Typography style={{ color: "white" }} className="member-role">
              {team.title}
            </Typography>
          }
          action={
            admin && (
              <IconButton onClick={() => onDelete(team.id)}>
                <Delete style={{ color: "red" }} />
              </IconButton>
            )
          }
          className="team-card-header"
        />
        <CardContent>
          <Typography paragraph className="member-summary">
            {team.details}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

const Team = () => {
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    client.get("/team/getAll").then((res) => {
      setTeams(res.data.team);
    });
  }, []);

  return (
    <div>
      <Header />
      <Box className="title-container">
        <Typography variant="h3" className="title-co">
          Team
        </Typography>
        <Typography paragraph className="desc-co">
          TEAM IS THE BASIC FRAMEWORK OF HOW YOU STRUCTURE YOUR BUSINESS.
          <br />
          THE  RIGHT TEAM SHARES THE SAME VISION AND CHALLENGES EACH OTHER TO
          MAKE IT BETTER IN DUE COURSE OF TIME.
          <br />
          WE AT GRUHAM TI AMORE ARE A GROUP OF PEOPLE BOUND BY OUR INHERENT
          COMPASSION TO DREAM AND DESIGN OUR DREAMS INTO A FUNCTIONAL REALITY.
          <br />
          TO US DESIGNING IS NOT A TEDIOUS JOB BUT OUR PASSION THAT WE INDULGE
          IN WITH OUR HEART AND SOUL.{" "}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Grid container className="team-container">
        {teams.map((item: any, index: number) => (
          <Grid item xs={12} key={index}>
            <Fade>
              <TeamCard team={item} />
            </Fade>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Team;
