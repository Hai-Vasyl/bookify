import Avatar from "./Avatar.js";
import { getDate } from "../helpers/convertDate.js";
import Button from "./Button.js";
import LinkSimple from "./LinkSimple.js";
import { btn } from "../datasets/main.js";
import { store } from "../context/main.js";

const UserCard = ({ info }) => {
  const avatar = Avatar({ user: info, large: true });
  const btnDelete = Button({
    data: `delete-user="${info.id}"`,
    className: `${btn.prime} card-user__delete`,
    icon: "delete",
  });
  const linkEmail = LinkSimple({
    href: `mailto:${info.email}`,
    icon: "alternate_email",
    label: info.email,
    isExternal: true,
  });
  const linkBookshelf = LinkSimple({
    href: `/favourites/${info.id}`,
    icon: "bookmarks",
    label: "Bookshelf",
  });

  return `
    <div class="card-user">
      ${
        store.user.role === "admin" && store.user.uid !== info.id
          ? btnDelete
          : ""
      }
      <div class="card-user__preview">
        <a class="card-user__avatar ${
          info.role === "admin" ? "card-user__avatar--admin" : ""
        }" href="/user/${info.id}" data-link>
          ${avatar}
        </a>
        ${
          info.role === "admin"
            ? `<span class="card-user__admin">
                <span class="material-icons-outlined">
                verified_user
                </span>
              </span>`
            : ""
        }
      </div>
      <div class="card-user__body">
        <div>
          <a class="card-user__username" href="/user/${info.id}" data-link>${
    info.firstname
  } ${info.lastname}</a>
        </div>
        ${linkEmail}
        ${linkBookshelf}
      </div>
      <span class="card-user__date">
        ${getDate(info.date)}
      </span>
    </div>
  `;
};

export default UserCard;
