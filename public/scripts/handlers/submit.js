import { closeAuthModal } from "./index.js";
import { moveTo } from "../main.js";
import { getParamQuery } from "../helpers/getParamsQuery.js";

export const submitFormAuth = async (event) => {
  event.preventDefault();
  const form = document.querySelector("#form-auth");
  const msg = form.querySelector("#msg-password");
  const firstname = form.querySelector("#field-input-firstname").value;
  const lastname = form.querySelector("#field-input-lastname").value;
  const email = form.querySelector("#field-input-email").value;
  const password = form.querySelector("#field-input-password").value;
  const isLogin = form.classList.contains("login");

  try {
    if (isLogin) {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } else {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const createUser = firebase.functions().httpsCallable("createUser");
      await createUser({ uid: response.user.uid, firstname, lastname, email });
    }
    closeAuthModal();
  } catch (error) {
    msg.textContent = error.message;
  }
};

export const submitFormSearch = (event) => {
  event.preventDefault();

  const search = document.querySelector("#input-search").value;
  if (!search.trim()) {
    return;
  }
  const filter = getParamQuery("filter") || "partial";
  const type = getParamQuery("type") || "all";
  const sort = getParamQuery("sort") || "relevance";

  moveTo(
    `/explore?page=1&filter=${filter}&type=${type}&sort=${sort}&search=${search}`,
  );
};
