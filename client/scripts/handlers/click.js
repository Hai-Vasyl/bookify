import AuthForm from "../components/AuthForm.js";
import { openModal, closeModal } from "./main.js";
import { moveTo } from "../main.js";

export const openAuthModal = () => {
  const form = AuthForm();
  openModal({ body: form, className: "modal__form-auth" });
};
export const closeAuthModal = () => {
  closeModal({ className: "modal__form-auth" });
};

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
    btnSubmit.textContent = "Sign Up";
    event.target.textContent = "Log In";
    title.textContent = "Create Account";
  } else {
    form.classList.add("login");
    firstname.classList.add("field__hidden");
    lastname.classList.add("field__hidden");
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
