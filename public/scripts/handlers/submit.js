import { closeAuthModal } from "./index.js";

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
