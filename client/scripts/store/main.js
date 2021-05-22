import { render } from "../main.js";

const userDefault = {
  uid: "some",
  firstname: "Vasyl",
  lastname: "Hai",
  email: "",
  color: "#ff482f",
  role: "unregistered",
  ava: "",
};

let user = { ...userDefault };

export const store = {
  param: "",
  user,
};

export const setParam = (newParam) => {
  store.param = newParam;
};

export const setUserData = (user) => {
  store.user = user;
  render();
};

export const removeUserData = () => {
  store.user = userDefault;
  render();
};
