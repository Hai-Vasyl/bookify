const DropDownButton = ({ btn, menu, className = "" }) => {
  return `
    <div class="btn-dropdown ${className}">
      <button class="btn-dropdown__btn" data-btn-dropdown>
        ${btn}
      </button>
      <div class="btn-dropdown__menu" data-menu-dropdown >
        <span class="btn-dropdown__triangle"></span>
        ${menu}
      </div>
    </div>
  `;
};

export default DropDownButton;
