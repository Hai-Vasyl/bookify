import AuthForm from "../components/AuthForm.js";

export const openModal = ({ body, className }) => {
  const bg = document.getElementById("bg");
  const modal = document.getElementById("modal");
  if (className) {
    modal.classList.add(className);
  }
  modal.insertAdjacentHTML("afterbegin", body);
  modal.classList.add("modal--active");
  bg.classList.add("bg--active");
};

export const closeModal = ({ className }) => {
  const bg = document.getElementById("bg");
  const modal = document.getElementById("modal");
  if (className && modal.classList.contains(className)) {
    modal.classList.remove(className);
  }
  while (modal.firstChild) {
    modal.removeChild(modal.lastChild);
  }
  modal.classList.remove("modal--active");
  bg.classList.remove("bg--active");
};

export const openAuthModal = () => {
  const form = AuthForm();
  openModal({ body: form, className: "modal__form-auth" });
};

export const closeAuthModal = () => {
  closeModal({ className: "modal__form-auth" });
};
