import { btn } from "../datasets/main.js";

const FieldPicker = ({ label, id, options, selected }) => {
  const optionItems = options.reduce((acumulator, item) => {
    const isSelected = selected === item.value;
    return (
      acumulator +
      `<option class="picker__option" value="${item.value}" ${
        isSelected ? "selected" : ""
      }>
       ${item.title}
      </option>`
    );
  }, "");

  return `
    <div class="picker">
      <label class="picker__label" for="${id}">${label}</label>
      <select class="${btn.prime} picker__select" id="${id}" data-btn-select>
        ${optionItems}
      </select>
    </div>
  `;
};

export default FieldPicker;
