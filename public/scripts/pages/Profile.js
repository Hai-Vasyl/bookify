import Avatar from "../components/Avatar.js";
import { store } from "../context/main.js";
import Title from "../components/Title.js";
import LinkSimple from "../components/LinkSimple.js";
import Button from "../components/Button.js";
import { btn } from "../datasets/main.js";
import Field from "../components/Field.js";

const Profile = async () => {
  let user = store.user;
  const form = [
    { id: "first-name", label: "First name", param: "firstname" },
    { id: "last-name", label: "Last name", param: "lastname" },
  ];

  if (store.param !== user.uid) {
    try {
      const userData = await firebase
        .firestore()
        .collection("users")
        .doc(store.param)
        .get();

      user = { ...userData.data(), uid: userData.id };
    } catch (error) {
      console.error(`Fetching user data error: ${error.message}`);
    }
  }

  const fields = form.reduce((acumulator, { id, label, param }) => {
    return (
      acumulator +
      Field({
        id,
        label,
        value: user[param],
        required: true,
      })
    );
  }, "");

  const title = Title({
    title: "User profile",
    subtitle: "Detailed information about user",
  });
  const avatar = Avatar({ user, large: true });
  const linkEmail = LinkSimple({
    href: `mailto:${user.email}`,
    icon: "alternate_email",
    label: user.email,
    isExternal: true,
  });
  const btnFlipForm = Button({
    id: "user-edit-flip",
    className: `${btn.prime} profile__btn-flip default`,
    icon: "edit",
  });
  const btnSubmit = Button({
    title: "Apply",
    className: btn.prime,
  });
  const btnDelete = Button({
    data: `delete-user="${user.id}"`,
    className: btn.second,
    icon: "delete",
    title: "Delete Account",
    isBtn: true,
  });
  const updateUserAva = Button({
    data: "update-user-ava",
    className: `${btn.prime}`,
    icon: "restart_alt",
  });
  const deleteUserAva = Button({
    data: "delete-user-ava",
    className: `${btn.second}`,
    icon: "delete",
  });

  return `
    <div class="profile">
      <header class="wrapper profile__header">${title}</header>
      <div class="wrapper profile__body">
        <div class="profile__image">
          <div class="${
            user.role === "admin" ? "admin" : ""
          } profile__lightbox">
          <div class="profile__update-ava">
            ${updateUserAva}${user.ava ? deleteUserAva : ""}
          </div>
            ${avatar}
            ${
              user.role === "admin"
                ? `<span class="card-user__admin profile__admin">
                    <span class="material-icons-outlined">
                    verified_user
                    </span>
                  </span>`
                : ""
            }
          </div>
        </div>
        <div class="profile__wrapper-info">
          <div class="profile__container">
            ${store.user.uid === store.param ? btnFlipForm : ""}
            <div class="profile__info profile__info--active">
              <h1 class="profile__username">
                ${user.firstname} ${user.lastname}
              </h1>
              <div class="profile__email">${linkEmail}</div>
            </div>
            ${
              store.user.uid === store.param
                ? `<form class="profile__form" id="form-user-edit">
                  <div class="profile__title-form">
                    Edit user information
                  </div>
                  <div class="profile__fields">${fields}</div>
                  <div class="profile__btns">
                    ${btnDelete + btnSubmit}
                  </div>
                </form>`
                : ""
            }
          </div>
          <div class="profile__books">
              <h3 class="profile__title">${
                store.user.uid === store.param
                  ? "Your bookshelf"
                  : "Bookshelf this user "
              }</h3>
              <div class="bookshelf__books profile__bookshelf"></div>
            </div>
        </div>
      </div>
    </div>
  `;
};

export default Profile;
