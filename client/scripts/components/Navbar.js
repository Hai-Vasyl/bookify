import { store } from "../store/main.js";
import NavLink from "../components/NavLink.js";
import NavButton from "../components/NavButton.js";
import DropDownButton from "../components/DropDownButton.js";
import UserInfoFiling from "../components/UserInfoFiling.js";
import { links as dataLinks } from "../datasets/links.js";

const Navbar = () => {
  const { user } = store;
  const isAuth = !!user.uid;

  const links = dataLinks.reduce(
    (acumulator, { href, title, icon, isBottom, isBtn }) => {
      if (!isBottom) {
        if (isBtn) {
          return acumulator + NavButton({ data: "open-auth", title, icon });
        }
        return acumulator + NavLink({ href, title, icon });
      }
      return acumulator;
    },
    "",
  );

  const dropDownBtn = DropDownButton({
    btn: UserInfoFiling({ user }),
    menu: `
      <a class="nav__link menu__link ${
        location.pathname === `/user/${user.uid}` ? "nav__link--active" : ""
      }" href="${`/user/${user.uid}`}" data-link> 
        <span class="material-icons-outlined nav__icon sealed">
            account_circle
        </span>
        <span class="sealed">My profile</span>
      </a>
      <button class="nav__link menu__link" id="btn-logout">
        <span class="material-icons-outlined nav__icon sealed" >
          logout
        </span>
        <span class="sealed">Log out</span>
      </button>`,
    className: "nav__dropdown",
  });

  return `
    <nav class="nav">
      <div class="nav__border"></div>
      <div class="nav__links">
        <a class="nav__logo" href="/" data-link>
          <img class="sealed" src="/../../images/logo.svg" alt="Logotype" />
        </a>
        <div class="nav__navbar">${links}</div>
        ${
          isAuth
            ? dropDownBtn
            : `<button class="nav__login" data-toggle-auth-form>Login</button>`
        }
      </div>
    </nav>
  `;
};

export default Navbar;
