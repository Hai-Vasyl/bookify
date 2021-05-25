const Field = ({ id, label, type = "text", required, className = "" }) => {
  return `
    <div id="field-${id}" class="field ${className}" >
      <label class="field__label" for="field-input-${id}" >${label}</label>
      <input name="${id}" class="field__input" id="field-input-${id}" type="${type}" ${
    required ? "required" : ""
  } />
      <span class="field__msg" id="msg-${id}" ></span>
    </div>
  `;
};

export default Field;
