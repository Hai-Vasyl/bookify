const Button = ({ id, data, title, className = "", icon, isBtn, disabled }) => {
  return `
    <button ${isBtn ? `type="button"` : ""} class="btn ${className}" ${
    data ? `data-btn-${data}` : ""
  } ${id ? `id="btn-${id}"` : ""} ${disabled ? "disabled" : ""}>
      ${
        icon
          ? `<span class="material-icons-outlined btn__icon sealed">${icon}</span>`
          : ""
      }
      ${title ? `<span class="btn__title sealed">${title}</span>` : ""}
    </button>
  `;
};

export default Button;
