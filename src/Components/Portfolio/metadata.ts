import { formElement } from "../FormGenerator";

export const addImageMetadata: formElement[] = [
  {
    label: "Image",
    name: "url",
    type: "file",
    variant: "outlined",
    fieldProps: {
      accept: "image/*",
    },
  },
];
