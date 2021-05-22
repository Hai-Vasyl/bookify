const NavLink = ({ href, title, icon, className = "" }) => {
  return `
    <a class="nav__link ${
      href === location.pathname ? "nav__link--active" : ""
    } ${className}" href="${href}" data-link>
      ${
        icon
          ? `<span class="material-icons-outlined nav__icon sealed">${icon}</span>`
          : ""
      }
      ${title ? `<span class="sealed">${title}</span>` : ""}
    </a>`;
};

export default NavLink;
