import { store } from "../context/main.js";
import Title from "../components/Title.js";

const Favourites = async () => {
  let user = store.user;

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

  const title = Title({
    title: "Bookshelf",
    subtitle: `Favorite books of ${user.firstname} ${user.lastname}`,
  });

  return `
    <div class="bookshelf">
      <header class="wrapper" >
        ${title}
      </header>
      <div class="wrapper bookshelf__books"></div>
    </div>
  `;
};

export default Favourites;
