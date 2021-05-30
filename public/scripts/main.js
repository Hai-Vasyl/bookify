import Navbar from "./components/Navbar.js";
import Modal from "./components/Modal.js";
import NavbarBottom from "./components/NavbarBottom.js";
import { setParam, setUserData, removeUserData } from "./context/main.js";
// import { getParamQuery } from "./helpers/getParamsQuery.js";
import { getRoutes } from "./datasets/routes.js";
import {
  flipFormAuth,
  redirectToPage,
  toggleDropDownMenu,
  closeAllPopups,
  logoutUser,
  redirectToPageNumber,
  redirectToPageArrow,
  resetSearchForm,
  toggleFormReply,
  deleteResponseItem,
  toggleFavoriteBook,
  togglePrivateBook,
} from "./handlers/click.js";
import { selectFilterSearchOption } from "./handlers/change.js";
import { openAuthModal, closeAuthModal } from "./handlers/index.js";
import {
  clearCurrentFieldError,
  resetSearchWithInput,
} from "./handlers/input.js";
import {
  submitFormAuth,
  submitFormSearch,
  submitFormResponse,
  submitFormReply,
} from "./handlers/submit.js";
import { updateComponent } from "./helpers/update.js";
// import { deleteResponse } from "../../functions/index.js";

export const setPage = async () => {
  const loader = document.getElementById("loader");
  loader.classList.add("loader--active");
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

  updateComponent(document.getElementById("content"), page);

  setTimeout(() => loader.classList.remove("loader--active"), 500);
};

export const render = () => {
  const navbar = Navbar();
  const modal = Modal();
  const navbarBottom = NavbarBottom();

  updateComponent(
    document.getElementById("root"),
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
  await firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const ref = firebase.firestore().collection("users").doc(user.uid);
      try {
        await ref.onSnapshot((snapshot) => {
          const userSnapshot = snapshot.data();
          setUserData({
            uid: user.uid,
            ...userSnapshot,
          });
        });
      } catch (error) {
        console.error(`Fetching registered user data error: ${error.message}`);
      }
    } else {
      removeUserData();
    }
  });

  document.body.addEventListener("change", (event) => {
    if (event.target.matches("[data-btn-select]")) {
      selectFilterSearchOption(event);
    }
  });

  document.body.addEventListener("input", (event) => {
    if (event.target.matches(".field__input")) {
      clearCurrentFieldError(event);
    } else if (event.target.matches("#input-search")) {
      resetSearchWithInput(event);
    }
  });

  document.body.addEventListener("submit", (event) => {
    if (event.target.matches("#form-auth")) {
      submitFormAuth(event);
    } else if (event.target.matches("#form-search")) {
      submitFormSearch(event);
    } else if (event.target.matches("#form-response")) {
      submitFormResponse(event);
    } else if (event.target.matches("[data-form-reply]")) {
      submitFormReply(event);
    }
  });

  document.body.addEventListener("click", (event) => {
    if (event.target.matches("[data-btn-open-auth]")) {
      openAuthModal();
    } else if (event.target.matches("#bg")) {
      closeAuthModal();
    } else if (event.target.matches("[data-btn-toggle-reply]")) {
      toggleFormReply(event);
    } else if (event.target.matches("#btn-auth-flip")) {
      flipFormAuth(event);
    } else if (event.target.matches("[data-link]")) {
      redirectToPage(event);
    } else if (event.target.matches("[data-btn-dropdown]")) {
      toggleDropDownMenu(event);
    } else if (event.target.matches("#bg-clear")) {
      closeAllPopups();
    } else if (event.target.matches("#btn-logout")) {
      logoutUser();
    } else if (event.target.matches("[data-btn-page-number]")) {
      redirectToPageNumber(event);
    } else if (event.target.matches("[data-btn-page-arrow]")) {
      redirectToPageArrow(event);
    } else if (event.target.matches("#btn-reset-search")) {
      resetSearchForm();
    } else if (event.target.matches("[data-btn-response-delete]")) {
      deleteResponseItem(event);
    } else if (event.target.matches(".book__bookmark")) {
      toggleFavoriteBook(event);
    } else if (event.target.matches("[data-btn-check-private]")) {
      togglePrivateBook(event);
    }
  });
});

window.addEventListener("popstate", setPage);
