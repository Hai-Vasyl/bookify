import { closeAuthModal } from "./index.js";
import { moveTo } from "../main.js";
import { getParamQuery } from "../helpers/getParamsQuery.js";

export const closeAllPopups = () => {
  document.getElementById("bg-clear").classList.remove("bg-clear--active");
  document
    .querySelectorAll("[data-btn-dropdown]")
    .forEach((item) => item.classList.remove("btn-dropdown__btn--active"));
  document
    .querySelectorAll("[data-menu-dropdown]")
    .forEach((item) => item.classList.remove("btn-dropdown__menu--active"));
  closeAuthModal();
};

export const flipFormAuth = (event) => {
  const form = document.getElementById("form-auth");
  const firstname = document.getElementById("field-firstname");
  const lastname = document.getElementById("field-lastname");
  const firstnameInput = firstname.querySelector("#field-input-firstname");
  const lastnameInput = lastname.querySelector("#field-input-lastname");
  const btnSubmit = document.getElementById("btn-auth-submit");
  const title = document.getElementById("title-auth");
  const errors = form.getElementsByClassName("field__msg");

  const isLogin = form.classList.contains("login");

  for (let err of errors) {
    err.textContent = "";
  }

  if (isLogin) {
    form.classList.remove("login");
    firstname.classList.remove("field__hidden");
    lastname.classList.remove("field__hidden");
    firstnameInput.required = true;
    lastnameInput.required = true;
    btnSubmit.textContent = "Sign Up";
    event.target.textContent = "Log In";
    title.textContent = "Create Account";
  } else {
    form.classList.add("login");
    firstname.classList.add("field__hidden");
    lastname.classList.add("field__hidden");
    firstnameInput.required = false;
    lastnameInput.required = false;
    btnSubmit.textContent = "Log In";
    event.target.textContent = "Sign Up";
    title.textContent = "Welcome Back!";
  }
};

export const redirectToPage = (event) => {
  event.preventDefault();
  const links = document.getElementsByClassName("nav__link");
  closeAllPopups();
  for (let link of links) {
    if (link.href === event.target.href) {
      link.classList.add("nav__link--active");
    } else {
      link.classList.remove("nav__link--active");
    }
  }
  moveTo(event.target.href);
};

export const toggleDropDownMenu = (event) => {
  const bg = document.getElementById("bg-clear");
  event.target.classList.toggle("btn-dropdown__btn--active");
  const dropDownParent = event.target.parentNode;
  dropDownParent
    .querySelector("[data-menu-dropdown]")
    .classList.toggle("btn-dropdown__menu--active");
  bg.classList.toggle("bg-clear--active");
};

export const logoutUser = async () => {
  await firebase.auth().signOut();
};

export const redirectToPageNumber = (event) => {
  const filter = getParamQuery("filter") || "partial";
  const type = getParamQuery("type") || "all";
  const sort = getParamQuery("sort") || "relevance";
  const search = getParamQuery("search");

  const pageNumber = event.target.dataset.btnPageNumber;
  moveTo(
    `/explore?page=${pageNumber}&filter=${filter}&type=${type}&sort=${sort}${
      search ? `&search=${search}` : ""
    }`,
  );
};

export const redirectToPageArrow = (event) => {
  const filter = getParamQuery("filter") || "partial";
  const type = getParamQuery("type") || "all";
  const sort = getParamQuery("sort") || "relevance";
  const page = getParamQuery("page") || 1;
  const search = getParamQuery("search");

  const isRight = !!+event.target.dataset.btnPageArrow;
  moveTo(
    `/explore?page=${
      isRight ? +page + 1 : page - 1
    }&filter=${filter}&type=${type}&sort=${sort}${
      search ? `&search=${search}` : ""
    }`,
  );
};

export const resetSearchForm = () => {
  const filter = getParamQuery("filter") || "partial";
  const type = getParamQuery("type") || "all";
  const sort = getParamQuery("sort") || "relevance";

  moveTo(`/explore?page=1&filter=${filter}&type=${type}&sort=${sort}`);
};
