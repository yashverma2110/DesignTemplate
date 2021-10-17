import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import classnames from "classnames";
import "./Section.css";
import { Zoom } from "react-awesome-reveal";

interface SectionProps {
  imgSrc: string;
  title: string;
  desc: string;
  align: "left" | "right";
  link?: string;
}

const Section = ({ imgSrc, title, desc, align, link }: SectionProps) => {
  const classes = useStyles();

  return (
    <Grid
      container
      className="root"
      direction={align === "right" ? "row-reverse" : "row"}
    >
      <Grid item xs={12} sm={6}>
        <Zoom>
          <div className="section-image-container">
            <img
              src={imgSrc}
              alt="portfolio"
              className="section-image"
              data-aos="zoom-in"
            />
          </div>
        </Zoom>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box
          className={classnames({
            "section-text": true,
            [classes.sectionTxt]: true,
          })}
        >
          <Typography className="title">{title}</Typography>
          <Typography paragraph className="desc">
            {desc}
          </Typography>
          {link && (
            <Link to={link} className="link">
              <Typography component="span">Read More</Typography>
            </Link>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Section;

const useStyles = makeStyles((theme) => ({
  sectionTxt: {
    marginTop: "20px",
    [theme.breakpoints.up("md")]: {
      marginTop: "0px",
    },
  },
}));
