const NavButton = ({ data, title, icon, className = "" }) => {
  return `
    <button class="nav__link ${className}" ${data ? `data-btn-${data}` : ""} >
      ${
        icon
          ? `<span class="material-icons-outlined nav__icon sealed">${icon}</span>`
          : ""
      }
      ${title ? `<span class="sealed">${title}</span>` : ""}
    </button>`;
};

export default NavButton;
