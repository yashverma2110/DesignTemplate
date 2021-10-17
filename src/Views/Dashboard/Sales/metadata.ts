import { tableMetadata } from "../../../Components/TableComponent/columnTypes";
import { projectTypes } from "../../../utils/constants";
import { formElement } from "../../../Components/FormGenerator";

export const salesGridView: tableMetadata = {
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
      header: "Project type",
      key: "project_type",
    },
    {
      header: "Status",
      key: "status",
    },
    {
      header: "Phone",
      key: "phone",
      columnActions: {
        call: true,
      },
    },
    {
      header: "Designer",
      key: "designer",
    },
    {
      header: "Execution Partner",
      key: "execution_partner",
    },
  ],
};

export const leadForm: formElement[] = [
  {
    label: "Name",
    name: "name",
    type: "text",
    variant: "outlined",
    fieldProps: {
      required: true,
    },
  },
  {
    label: "Email",
    name: "email",
    type: "text",
    variant: "outlined",
    fieldProps: {
      required: true,
    },
  },
  {
    label: "Phone",
    name: "phone",
    type: "tel",
    variant: "outlined",
    fieldProps: {
      required: true,
    },
  },
  {
    label: "Project Type",
    name: "project_type",
    type: "text",
    variant: "outlined",
    fieldProps: {
      select: true,
      required: true,
    },
    options: projectTypes,
  },
  {
    label: "Status",
    name: "status",
    type: "text",
    variant: "outlined",
    fieldProps: {
      select: true,
      required: true,
    },
    options: [
      "Cold",
      "Dead",
      "Completed",
      "Assigned",
      "Warm",
      "Hot",
      "Finalised",
    ],
  },
];
