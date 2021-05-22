export const clearCurrentFieldError = (event) => {
  document.getElementById(
    event.target.id.replace("field-input", "msg"),
  ).textContent = "";
};
