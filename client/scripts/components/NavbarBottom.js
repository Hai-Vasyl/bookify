import { links as dataLinks } from "../datasets/links.js";
import NavButton from "./NavButton.js";
import NavLink from "./NavLink.js";

const NavbarBottom = () => {
  const links = dataLinks.reduce((acumulator, { icon, isBtn, href }) => {
    if (isBtn) {
      return (
        acumulator +
        NavButton({
          data: "open-auth",
          icon,
          className: "nav-bottom__link",
        })
      );
    }
    return acumulator + NavLink({ href, icon, className: "nav-bottom__link" });
  }, "");

  return `
  <nav class="nav nav-bottom">
    <div class="nav__links nav-bottom__links">
      ${links}
    </div>
  </nav>
  `;
};

export default NavbarBottom;
