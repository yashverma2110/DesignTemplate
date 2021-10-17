import { portfolio } from "../assets/urls";

export const getAuthToken = () => {
  return localStorage.getItem("XKEY");
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  else return user;
};

export const validateRoles = (roles: string) => {
  var user: any = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
    var isAllowed =
      user?.[0]?.roles === "superadmin" || user?.[0]?.roles === roles;

    return isAllowed;
  }

  return false;
};

export const getImages = (type: string) => {
  const keys: string[] = Object.keys(portfolio).filter((key) =>
    key.includes(type)
  );

  const arr: any[] = [];

  keys.forEach((el) => arr.push(portfolio[el]));

  return arr;
};

export const sendEmail = (ev: any, setMessage: any) => {
  ev.preventDefault();
  const form = ev.target;
  const data = new FormData(form);
  const xhr = new XMLHttpRequest();
  xhr.open(form.method, form.action);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      form.reset();
      setMessage({
        open: true,
        severity: "success",
        msg: "We'll get back to you soon",
      });
    } else {
      setMessage({
        open: true,
        severity: "error",
        msg: "Sorry! Something went wrong. Please try again.",
      });
    }
  };
  xhr.send(data);
  return false;
};

export const handleRedirectionToDash = (history: any) => {
  const user = getUser()?.[0];

  if (user) {
    if (user.roles === "superadmin") history.push("/dashboard");
    else if (user.roles === "Site Admin") history.push("/site-admin");
    else if (user.roles === "Sales" || user.roles === "Operation")
      history.push("/sales-dash");
    else if (user.roles === "Designer" || user.roles === "Execution Partner")
      history.push("/users-dash");
  }
};
