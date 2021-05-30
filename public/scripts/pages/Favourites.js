import { store } from "../context/main.js";
import { fetchData } from "../helpers/fetchData.js";
import BookCard from "../components/BookCard.js";
import Title from "../components/Title.js";
import { updateComponent } from "../helpers/update.js";

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
  const favorites = firebase.firestore().collection("favorites");
  const queryData = favorites.where("owner", "==", store.param);

  try {
    await queryData.onSnapshot(async (snapshot) => {
      const container = document.querySelector(".bookshelf__books");
      updateComponent(container, "");

      snapshot.forEach(async (doc) => {
        const data = doc.data();
        const book = await fetchData(
          `https://www.googleapis.com/books/v1/volumes/${data.book}`,
        );
        if (container) {
          container.insertAdjacentHTML(
            "afterbegin",
            BookCard({
              info: book,
              owner: data.owner,
              isPrivate: data.private,
              favorId: doc.id,
            }),
          );
        }
      });
    });
  } catch (error) {
    console.error(`Fetching book responses error: ${error.message}`);
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
