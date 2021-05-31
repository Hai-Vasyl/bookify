import Avatar from "./Avatar.js";
import Button from "./Button.js";
import { store } from "../context/main.js";
import { btn } from "../datasets/main.js";

const ResponseForm = () => {
  const { user } = store;
  const userAva = Avatar({ user });
  const btnPost = Button({
    title: "Response",
    className: `${btn.prime} ${btn.backwards}`,
    icon: "send",
  });
  const btnLogin = Button({ title: "Log In", className: btn.prime });

  return user.uid
    ? `
    <div class="response">
      <div>
        <a href="/user/${user.uid}" data-link class="response__avatar ${
        user.role === "admin" ? "admin" : ""
      }">${userAva}</a>
      </div>
      <div class="response__body">
        <a class="response__title" href="/user/${user.uid}" data-link>${
        user.firstname
      } ${user.lastname}</a>
        <form id="form-response" class="response__form">
          <input class="response__input" type="text" placeholder="Input response here"  />
          <div class="response__btns">
            ${btnPost}
          </div>
        </form>
      </div>
    </div>
  `
    : `
    <div class="response-msg">
      <span class="response-msg__icon" class="material-icons-outlined">
        error_outline
      </span>
      <div class="response-msg__title">Please login to response</div>
      ${btnLogin}
    </div>
  `;
};

export default ResponseForm;
