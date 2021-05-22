const Button = ({ id, data, title, className = "", icon, isBtn }) => {
  return `
    <button ${isBtn ? `type="button"` : ""} class="btn ${className}" ${
    data ? `data-btn-${data}` : ""
  } ${id ? `id="btn-${id}"` : ""}>
      ${title ? `<span class="btn__title sealed">${title}</span>` : ""}
      ${
        icon
          ? `<span class="material-icons-outlined btn__icon sealed">${icon}</span>`
          : ""
      }
    </button>
  `;
};

export default Button;
