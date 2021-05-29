const Link = ({ title, href, className = "", icon, isExternal }) => {
  return `
    <a href="${href}" class="btn btn-link ${className}" ${
    isExternal ? "" : "data-link"
  }>
      ${
        icon
          ? `<span class="material-icons-outlined btn__icon sealed">${icon}</span>`
          : ""
      }
      ${title ? `<span class="btn__title sealed">${title}</span>` : ""}
    </a>
  `;
};

export default Link;
