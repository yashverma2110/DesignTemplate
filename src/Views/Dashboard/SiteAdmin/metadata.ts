import { formElement } from "../../../Components/FormGenerator";

export const memeberForm: formElement[] = [
  {
    label: "Name",
    name: "name",
    type: "text",
    variant: "outlined",
  },
  {
    label: "Details",
    name: "details",
    type: "text",
    variant: "outlined",
    fieldProps: {
      multiline: true,
      rows: 4,
      rowsMax: 5,
    },
  },
  {
    label: "Title",
    name: "title",
    type: "text",
    variant: "outlined",
  },
  {
    label: "Role",
    name: "role",
    type: "text",
    variant: "outlined",
    fieldProps: {
      select: true,
    },
    options: ["Designer", "Team Member"],
  },
  {
    label: "",
    name: "image",
    type: "file",
    variant: "outlined",
    fieldProps: {
      accept: "image/*",
    },
  },
];

export const categoryMetadata: formElement[] = [
  {
    label: "Name of the category",
    name: "category",
    type: "text",
    variant: "outlined",
  },
];

export const testimonialMetadata: formElement[] = [
  {
    label: "Name",
    name: "name",
    type: "text",
    variant: "outlined",
  },
  {
    label: "Rating",
    name: "rating",
    type: "rating",
    variant: "outlined",
  },
  {
    label: "Message",
    name: "message",
    type: "text",
    variant: "outlined",
    fieldProps: {
      multiline: true,
      rows: 4,
      rowsMax: 5,
    },
  },
  {
    label: "",
    name: "url",
    type: "file",
    variant: "outlined",
    fieldProps: {
      accept: "image/*",
    },
  },
];
