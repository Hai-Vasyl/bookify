import { closeAuthModal } from "./index.js";
import { moveTo } from "../main.js";
import { getParamQuery } from "../helpers/getParamsQuery.js";
import { store } from "../context/main.js";

const addNewBookResponse = async ({ event, content, response }) => {
  if (!content.trim()) {
    return;
  }
  const loader = document.getElementById("loader");
  loader.classList.add("loader--active");
  try {
    const responseBook = firebase.functions().httpsCallable("responseBook");
    const params = { owner: store.user.uid, book: store.param, content };
    await responseBook(response ? { ...params, response } : params);
    event.target.reset();
  } catch (error) {
    console.error(`Creating response for book error: ${error.message}`);
  }
  loader.classList.remove("loader--active");
};

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

export const submitFormResponse = async (event) => {
  event.preventDefault();

  const content = event.target.querySelector(".response__input").value;
  addNewBookResponse({ event, content });
};

export const submitFormReply = async (event) => {
  event.preventDefault();
  const response = event.target.dataset.formReply;
  const content = event.target.querySelector(".response-item__input").value;
  await addNewBookResponse({ event, content, response });
  event.target.classList.toggle("response-item__form--active");
};
