const LinkSimple = ({ href, icon, label, className = "", isExternal }) => {
  return `
    <a href="${href}" class="link-simple ${className}" ${
    isExternal ? "" : "data-link"
  }>
      <span class="material-icons-outlined link-simple__icon sealed">
        ${icon}
      </span>
      <span class="link-simple__label sealed">${label}</span>
    </a>
  `;
};

export default LinkSimple;
