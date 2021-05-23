import Navbar from "./components/Navbar.js";
import Modal from "./components/Modal.js";
import Button from "./components/Button.js";
import NavbarBottom from "./components/NavbarBottom.js";
// import FormAuth from "./components/FormAuth.js";
import { store, setParam } from "./store/main.js";
// import { getColor } from "./helpers/randomColor.js";
// import { getParamQuery } from "./helpers/getParamsQuery.js";
import { getRoutes } from "./datasets/routes.js";
import {
  openAuthModal,
  closeAuthModal,
  flipFormAuth,
  redirectToPage,
  toggleDropDownMenu,
  closeAllPopups,
} from "./handlers/click.js";
import { clearCurrentFieldError } from "./handlers/input.js";
import { btn } from "./datasets/main.js";

export const setPage = async () => {
  const path = location.pathname;
  const routes = getRoutes();
  let route;
  let param;

  const locationParts = path.split("/");
  routes.forEach((item) => {
    const routeParts = item.path.split("/");
    if (routeParts.length === locationParts.length) {
      if (
        item.path === path ||
        (item.path.includes(":") &&
          routeParts.slice(0, -1).join("/") ===
            locationParts.slice(0, -1).join("/"))
      ) {
        param = locationParts[locationParts.length - 1];
        route = item;
      }
    }
  });

  if (!route) {
    route = routes[0];
  }
  if (param) {
    setParam(param);
  }

  const { component, title } = route;

  document.title = title;
  const page = await component();

  const content = document.getElementById("content");

  while (content.firstChild) {
    content.removeChild(content.lastChild);
  }

  content.insertAdjacentHTML("afterbegin", page);
};

export const render = () => {
  const navbar = Navbar();
  const modal = Modal();
  const navbarBottom = NavbarBottom();

  document.getElementById("root").insertAdjacentHTML(
    "afterbegin",
    `
    <div class="page" id="page">
      <div class="bg" id="bg" >
        <span class="material-icons-outlined bg__btn-close sealed">
          close
        </span>
      </div>
      <div class="bg-clear" id="bg-clear" ></div>
      ${navbar}
      ${modal}
      <div class="page__content" id="content"></div>
      ${navbarBottom}
    </div>
  `,
  );

  setPage();
};

export const moveTo = (path) => {
  history.pushState(null, null, path);
  setPage();
};

document.addEventListener("DOMContentLoaded", async () => {
  render();

  document.body.addEventListener("input", (event) => {
    if (event.target.matches(".field__input")) {
      clearCurrentFieldError(event);
    }
  });

  document.body.addEventListener("click", (event) => {
    if (event.target.matches("[data-btn-open-auth]")) {
      openAuthModal();
    } else if (event.target.matches("#bg")) {
      closeAuthModal();
    } else if (event.target.matches("#btn-auth-flip")) {
      flipFormAuth(event);
    } else if (event.target.matches("[data-link]")) {
      redirectToPage(event);
    } else if (event.target.matches("[data-btn-dropdown]")) {
      toggleDropDownMenu(event);
    } else if (event.target.matches("#bg-clear")) {
      closeAllPopups();
    }
  });
});

window.addEventListener("popstate", setPage);
