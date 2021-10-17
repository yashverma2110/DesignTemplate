import { formElement } from "../../../Components/FormGenerator";
import { tableMetadata } from "../../../Components/TableComponent/columnTypes";

export const addUserMetadata: formElement[] = [
  {
    label: "Name",
    name: "name",
    type: "text",
    variant: "outlined",
  },
  {
    label: "Email",
    name: "email",
    type: "text",
    variant: "outlined",
  },
  {
    label: "Phone number",
    name: "phone",
    type: "text",
    variant: "outlined",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    variant: "outlined",
  },
  {
    label: "Designation",
    name: "department",
    type: "text",
    variant: "outlined",
  },
  {
    label: "Department",
    name: "roles",
    type: "text",
    variant: "outlined",
    fieldProps: {
      select: true,
    },
    options: [
      "Site Admin",
      "Sales",
      "Operation",
      "Designer",
      "Execution Partner",
    ],
  },
];

export const usersGridView: tableMetadata = {
  title: "Sales",
  columns: [
    {
      header: "Name",
      key: "name",
    },
    {
      header: "Email",
      key: "email",
    },
    {
      header: "Department",
      key: "roles",
    },
    {
      header: "Designation",
      key: "department",
    },
    {
      header: "Phone",
      key: "phone",
      columnActions: {
        call: true,
      },
    },
  ],
};
