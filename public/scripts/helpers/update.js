export const updateComponent = (parent, component) => {
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
  parent.insertAdjacentHTML("afterbegin", component);
};
