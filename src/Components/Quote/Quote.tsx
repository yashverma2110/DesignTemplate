import React from "react";
import { Grid, Typography } from "@material-ui/core";
import "./Quote.css";

interface QuoteProps {
  quote: string;
  author?: string;
}

const Quote = ({ quote, author }: QuoteProps) => {
  return (
    <Grid container className="root">
      <Grid item xs={12}>
        <Typography className="quote">
          <i>{quote}</i>
        </Typography>
      </Grid>
      {author && (
        <Grid item xs={12}>
          <Typography className="author">-{author}</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Quote;
