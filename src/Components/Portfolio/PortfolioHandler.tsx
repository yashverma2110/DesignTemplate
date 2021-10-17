import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  CardMedia,
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import { Dispatch, useCallback, useEffect, useState } from "react";
import { client } from "../../utils/api.config";
import { getAuthToken } from "../../utils/methods";
import FormGenerator from "../FormGenerator";
import { addImageMetadata } from "./metadata";
import { ReactSortable } from "react-sortablejs";
import "./Portfolio.css";

interface PortfolioHandlerProps {
  name: string;
  id: number;
  setMessage: Dispatch<any>;
  refetchCallback?: any;
}

const PortfolioHandler = ({
  name,
  id,
  setMessage,
  refetchCallback,
}: PortfolioHandlerProps) => {
  const [images, setImages] = useState<any[]>([]);
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getImages = useCallback(() => {
    if (id) {
      client.get(`/portfolio/images/${id}`).then((res) => {
        setImages(res.data.images);
      });
    }
  }, [id]);

  useEffect(() => {
    getImages();
  }, [getImages]);

  const getFormData = (data: any) => {
    setFormData(data);
  };

  const addImageHandler = () => {
    const payload = {
      ...formData,
      parent: id,
    };

    client
      .post("/portfolio/image/add", payload, {
        headers: {
          Authorization: getAuthToken(),
        },
      })
      .then(() => {
        getImages();
        setMessage({
          open: true,
          msg: "New image added",
          severity: "success",
        });
      });
  };

  const deleteCategoryHandler = () => {
    client
      .delete(`/portfolio/${id}`, {
        headers: {
          Authorization: getAuthToken(),
        },
      })
      .then(() => {
        refetchCallback!();
        setMessage({
          open: true,
          msg: "Deleted Succesfully",
          severity: "success",
        });
      });
  };

  const handleOrderChange = () => {
    const imgs = images.map((item, index) => ({
      pos: index,
      id: item.id,
    }));

    const payload = {
      images: imgs,
    };

    client
      .put(`/portfolio/order`, payload, {
        headers: {
          Authorization: getAuthToken(),
        },
      })
      .then(() => {
        setMessage({
          open: true,
          msg: "Order Changed Successfully",
          severity: "success",
        });
      });
  };

  const deleteImage = (id: number) => {
    client
      .delete(`/portfolio/image/${id}`, {
        headers: {
          Authorization: getAuthToken(),
        },
      })
      .then(() => {
        getImages();
        setMessage({
          open: true,
          msg: "Deleted Successfully",
          severity: "success",
        });
      });
  };

  return (
    <Card className="portfolio-card" elevation={3}>
      <CardHeader
        className="portfolio-title"
        title={
          <Typography>
            <b>{name}</b>
          </Typography>
        }
        action={
          <IconButton onClick={deleteCategoryHandler}>
            <Delete style={{ color: "red" }} />
          </IconButton>
        }
      />
      <CardContent>
        <ReactSortable
          list={images}
          setList={setImages}
          style={{ display: "flex" }}
        >
          {images.map((data: any, index: number) => (
            <Card key={index} style={{ marginRight: "10px" }}>
              <CardHeader
                action={
                  <IconButton onClick={() => deleteImage(data.id)}>
                    <Delete />
                  </IconButton>
                }
              />
              <CardMedia
                image={data.url}
                style={{ height: "200px", width: "200px" }}
              />
            </Card>
          ))}
        </ReactSortable>
      </CardContent>
      <CardActions className="portfolio-actions">
        <FormGenerator
          metadata={addImageMetadata}
          getFormData={getFormData}
          setLoadingParent={setLoading}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addImageHandler}
          disabled={formData === null || loading}
        >
          Add
        </Button>
        <Button variant="contained" color="primary" onClick={handleOrderChange}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default PortfolioHandler;
