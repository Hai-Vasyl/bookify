import { store } from "../context/main.js";
import NavLink from "./NavLink.js";
import NavButton from "./NavButton.js";
import DropDownButton from "./DropDownButton.js";
import UserInfoFiling from "./UserInfoFiling.js";
import Button from "./Button.js";
import { getLinks } from "../datasets/links.js";
import { btn } from "../datasets/main.js";

const Navbar = () => {
  const { user } = store;
  const isAuth = !!user.uid;

  const links = getLinks().reduce(
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
    menu:
      NavLink({
        href: `/user/${user.uid}`,
        title: "My profile",
        icon: "account_circle",
        className: "nav__menu-link",
      }) +
      NavButton({
        id: "logout",
        title: "Log out",
        icon: "logout",
        className: "nav__menu-link",
      }),
    className: "nav__dropdown",
  });
  const btnLogin = Button({
    data: "open-auth",
    title: "Login",
    className: `${btn.second} nav__login`,
    icon: "login",
  });

  return `
    <nav class="nav">
      <div class="nav__border"></div>
      <div class="wrapper nav__links">
        <a class="nav__logo" href="/" data-link>
          <img class="sealed" src="/../../images/logo.svg" alt="Logotype" />
        </a>
        <div class="nav__navbar">${links}</div>
        ${isAuth ? dropDownBtn : btnLogin}
      </div>
    </nav>
  `;
};

export default Navbar;
