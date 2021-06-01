export const updateComponent = (parent, component) => {
  while (parent && parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
  parent && parent.insertAdjacentHTML("afterbegin", component);
};
