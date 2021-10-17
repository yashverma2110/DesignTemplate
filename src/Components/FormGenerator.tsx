import { Dispatch, useCallback, useEffect, useState } from "react";
import {
  MenuItem,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  GridSize,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import File from "@material-ui/icons/FileCopy";
import { uploadFile } from "../utils/actions";
import { getAuthToken } from "../utils/methods";
import { client } from "../utils/api.config";

export type formElement = {
  label: string;
  name: string;
  type: string;
  variant: "outlined" | "filled" | "standard";
  placeholder?: string;
  validation?: any;
  fieldProps?: any;
  options?: any[] | "async";
  optionsEntity?: "/user/Designer" | "/user/Execution Partner";
  optionKeyName?: "name";
  title?: string;
  checkboxes?: string[];
  display?: boolean;
  ratio?: GridSize;
};

interface FormGeneratorProps {
  metadata: formElement[];
  getFormData: (formData: any) => void;
  setLoadingParent?: Dispatch<boolean>;
  initialData?: any;
}

const FormGenerator = ({
  metadata,
  getFormData,
  setLoadingParent,
  initialData,
}: FormGeneratorProps) => {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<any>({});

  useEffect(() => {
    if (initialData && Object.keys(formData).length === 0) {
      setFormData(initialData);
    }
  }, [initialData, formData]);

  const getOptions = useCallback((formElement: formElement) => {
    if (formElement.options !== "async") {
      setOptions((op: any) => ({
        ...op,
        [formElement.name]: formElement.options,
      }));
    } else {
      client
        .get(`${formElement.optionsEntity}`, {
          headers: {
            Authorization: getAuthToken(),
          },
        })
        .then((res) => {
          setOptions((op: any) => ({
            ...op,
            [formElement.optionsEntity!]: res.data["users"].map(
              (item: any) => item[formElement.optionKeyName!]
            ),
          }));
        });
    }
  }, []);

  useEffect(() => {
    metadata.forEach((formElement: formElement) => getOptions(formElement));
  }, [metadata, getOptions]);

  useEffect(() => {
    setLoadingParent && setLoadingParent(loading);
  }, [loading, setLoadingParent]);

  const handleChange = (e: any) => {
    const data = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(data);

    getFormData(data);
  };

  const handleFileUpload = async (e: any) => {
    setLoading(true);
    const name = e.target.name;
    const response: any = await uploadFile(e.target.files[0]);

    setLoading(false);

    if (response?.data?.url) {
      const data = {
        ...formData,
        [name]: response.data.url,
      };
      setFormData(data);
      getFormData(data);
    }
  };

  const handleChangeOfChecbox = (event: any, formElement: formElement) => {
    var value = formData[formElement.name]?.split(",") ?? [];

    if (event.target.checked) {
      value.push(event.target.name);
    } else {
      value = value.filter((room: string) => room !== event.target.name);
    }

    const data = {
      ...formData,
      [formElement.name]: value.toString(),
    };

    setFormData(data);

    getFormData(data);
  };

  const getDeafultValue = (formElement: formElement, value: any) => {
    if (formElement.type === "file") return undefined;

    if (value) {
      return value;
    }

    if (formElement.fieldProps?.select) {
      return "";
    }

    return null;
  };

  return (
    <form className="modal-form">
      <Grid container spacing={1}>
        {metadata.map((formElement: formElement, index: number) => {
          if (formElement.title)
            return (
              <Grid xs={12}>
                <Typography
                  key={index}
                  variant="h5"
                  className="form-section-title"
                >
                  {formElement.title}
                </Typography>
              </Grid>
            );

          if (formElement.type === "checkboxControl") {
            return (
              <FormGroup>
                <FormLabel>
                  <Typography variant="subtitle1">
                    <b>{formElement.label}</b>
                  </Typography>
                </FormLabel>
                <Box>
                  {formElement.checkboxes?.map(
                    (item: string, index: number) => (
                      <FormControlLabel
                        key={index}
                        control={<Checkbox color="primary" name={item} />}
                        label={item}
                        checked={formData[formElement.name]?.indexOf(item) > -1}
                        onChange={(event: any) =>
                          handleChangeOfChecbox(event, formElement)
                        }
                      />
                    )
                  )}
                </Box>
              </FormGroup>
            );
          }

          if (formElement.type === "rating") {
            return (
              <Rating
                name={formElement.name}
                value={formData[formElement.name]}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    [formElement.name]: newValue,
                  });
                }}
              />
            );
          }

          return (
            <Grid item xs={12} md={formElement.ratio ?? 12}>
              <FormControl
                key={index}
                style={{
                  display: formElement.display === false ? "none" : "block",
                }}
              >
                <FormLabel>
                  <Typography variant="subtitle1">
                    <b>{formElement.label}</b>
                  </Typography>
                </FormLabel>
                <TextField
                  key={index}
                  name={formElement.name}
                  type={formElement.type}
                  placeholder={formElement.placeholder}
                  variant={formElement.variant}
                  value={
                    initialData
                      ? getDeafultValue(formElement, formData[formElement.name])
                      : undefined
                  }
                  className="form-field"
                  onChange={
                    formElement.type === "file"
                      ? handleFileUpload
                      : handleChange
                  }
                  InputProps={{
                    endAdornment: formElement.type === "file" &&
                      formData[formElement.name] && (
                        <InputAdornment position="end">
                          <a
                            href={formData[formElement.name]}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <File color="primary" />
                          </a>
                        </InputAdornment>
                      ),
                  }}
                  {...formElement.fieldProps}
                >
                  {formElement?.fieldProps?.select &&
                    options[
                      formElement.options === "async"
                        ? formElement.optionsEntity!
                        : formElement.name
                    ]?.map((option: any, key: number) => (
                      <MenuItem key={key} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                </TextField>
              </FormControl>
            </Grid>
          );
        })}
      </Grid>
    </form>
  );
};

export default FormGenerator;
