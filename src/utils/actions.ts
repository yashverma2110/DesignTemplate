import axios from "axios";

export type actionTypes = "superadmin" | "siteadmin" | "sales" | "designer";

export enum roles {
  SUPER_ADMIN = "superadmin",
  SITE_ADMIN = "siteadmin",
  SALES = "sales",
  DESIGNER = "designer",
}

export const uploadFile = async (file: any) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "yglddbto");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/gta/image/upload",
      data
    );

    return response;
  } catch (error) {
    console.log("upload failed", error);
    return error;
  }
};
