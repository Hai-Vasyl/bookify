import Button from "./Button.js";
import Avatar from "./Avatar.js";
import { btn } from "../datasets/main.js";
import { getDate } from "../helpers/convertDate.js";

const Response = ({ id = "", user, content, date, className = "" }) => {
  const userAva = Avatar({ user });
  const btnToggleReply = Button({
    data: "toggle-reply",
    title: "Reply",
    className: `${btn.second} response-item__btn`,
    icon: "reply",
  });
  const btnReply = Button({
    data: "reply",
    title: "Post",
    className: `${btn.prime} response-item__btn`,
  });

  return `
    <div class="response-item ${className}" >
      <div>
        <a href="/user/${
          user.uid
        }" data-link class="response-item__avatar">${userAva}</a>
      </div>
      <div class="response-item__body">
        <div class="response-item__title">
          <a class="response-item__username" href="/user/${
            user.uid
          }" data-link>${user.firstname} ${user.lastname}</a>
          <span class="response-item__date">${getDate(date)}</span>
        </div>
        <p class="response-item__content">${content}</p>
        <div class="response-item__tools">
          ${btnToggleReply}
          <form class="response-item__form" data-form-reply="${id}">
            <input class="response-item__input" type="text" placeholder="Reply this response" />
            ${btnReply}
          </form>
        </div>
      </div>
    </div>
  `;
};

export default Response;
