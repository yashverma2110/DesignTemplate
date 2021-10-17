import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  Typography,
  IconButton,
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import Header from "../Components/Header/Header";
import { Rating } from "@material-ui/lab";
import { Fade } from "react-awesome-reveal";
import "./styles/Testimonials.css";
import { useEffect, useState } from "react";
import { client } from "../utils/api.config";
import { getAuthToken } from "../utils/methods";

interface TestimonialCardProps {
  testimonial: any;
  admin?: boolean;
  refetchCallback?: any;
}

export const TestimonialCard = ({
  testimonial,
  admin = false,
  refetchCallback,
}: TestimonialCardProps) => {
  const classes = useStyles();

  const onDelete = (id: number) => {
    client
      .delete(`/customer/testimonial/${id}`, {
        headers: {
          Authorization: getAuthToken(),
        },
      })
      .then(() => refetchCallback!());
  };

  return (
    <Card elevation={3} className="review-card">
      <CardHeader
        avatar={<Avatar className={classes.avatar} src={testimonial.url} />}
        title={<Typography>{testimonial.name}</Typography>}
        subheader={<Rating value={testimonial.rating} />}
        action={
          admin && (
            <IconButton onClick={() => onDelete!(testimonial.id)}>
              <Delete />
            </IconButton>
          )
        }
      />
      <CardContent>
        <Typography paragraph>{testimonial.message}</Typography>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    client.get("/customer/testimonial/getAll").then((res) => {
      setTestimonials(res.data.testimonials);
    });
  }, []);

  return (
    <div>
      <Header />
      <Box className="title-container">
        <Typography variant="h3" className="title-co">
          Testimonials
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Grid container>
        {testimonials.map((testimonial, index) => (
          <Grid item xs={12} key={index} className="review-card-container">
            <Fade>
              <TestimonialCard testimonial={testimonial} />
            </Fade>
            {index + 1 !== testimonials.length && <Divider variant="middle" />}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Testimonials;

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
