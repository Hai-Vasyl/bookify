import Title from "../components/Title.js";
import UserCard from "../components/UserCard.js";
import { updateComponent } from "../helpers/update.js";

const Users = async () => {
  try {
    await firebase
      .firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        const container = document.querySelector(".users__items");
        updateComponent(container, "");

        snapshot.forEach((doc) => {
          container.insertAdjacentHTML(
            "afterbegin",
            UserCard({
              info: { ...doc.data(), id: doc.id },
            }),
          );
        });
      });
  } catch (error) {
    console.error(`Fetching users error: ${error.message}`);
  }

  const title = Title({
    title: "All Users",
    subtitle: "Explore bookshelves, other users",
  });
  return `
    <div class="users">
      <header class="wrapper" >
        ${title}
      </header>
      <div class="wrapper users__items">
      </div>
    </div>
  `;
};

export default Users;
