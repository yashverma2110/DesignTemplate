import { Box, Divider, Typography } from "@material-ui/core";
import { imgs } from "../assets/urls";
import Header from "../Components/Header/Header";
import Quote from "../Components/Quote/Quote";
import Section from "../Components/Section/Section";
import "./styles/Philosophy.css";

const Philosophy = () => {
  return (
    <div>
      <Header />
      <Box className="title-container">
        <Typography variant="h3" className="title-co">
          Philosophy
        </Typography>
        <Typography paragraph className="desc-co">
          Luxury is not just about being rich
          <br />
          Luxury is about class
          <br />
          Luxury is about being comfortable.{" "}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Section
        title={`All of us know & believe there is no place like "HOME".`}
        desc="That's why, we at Gruham Ti'amore emphasise on attention to detail. We preserve the tiniest of your
        memories, cozy up the corners you crave, paint it with the palate of love & strive to enhance the
        grandeur of your home.
        We just want to build homes that you’re proud of, homes that you can’t wait to get back to and most
        importantly be the proud owner of:-"
        align="left"
        imgSrc={imgs.pic11}
      />
      <Divider variant="middle" />
      <Quote quote="“Casa Di Amore E Fede, A House Of Love And Faith”." />
      <Divider variant="middle" />
      <Section
        title="FUNDAMENTAL DESIGN AND PHILOSOPHY"
        desc="The fundamental design philosophy here at Gruham Ti'Amore is all about attention to detail, originality,
        exclusivity, safety & quality. We believe in, create and promote designs with a timeless elegance which
        make your home extremely unique & exquisite while not compromising on the safety or longevity of the
        home. Also, every project that we undertake is with a minimal wastage footprint of any kind."
        align="right"
        imgSrc={imgs.pic12}
      />
      <Divider variant="middle" />
      <Section
        title="STRONG AND PERSONALIZED BONDS"
        desc="Just like our design philosophy, we also follow a client profiling practice. The reason for this is so that we
        are able to understand the needs and requirements of the client before we begin any sort of ground
        work. That's why we are known for building a strong and personalized bond with every single client, from
        the design stage, through execution and right till completion."
        align="left"
        imgSrc={imgs.pic13}
      />
    </div>
  );
};

export default Philosophy;
