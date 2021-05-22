const Field = ({ id, label, type = "text", className = "" }) => {
  return `
    <div id="field-${id}" class="field ${className}" >
      <label class="field__label" for="field-input-${id}" >${label}</label>
      <input class="field__input" id="field-input-${id}" type="${type}" />
      <span class="field__msg" id="msg-${id}" ></span>
    </div>
  `;
};

export default Field;
