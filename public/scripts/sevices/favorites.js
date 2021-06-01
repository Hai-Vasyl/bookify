import { fetchData } from "../helpers/fetchData.js";
import BookCard from "../components/BookCard.js";
import { store } from "../context/main.js";
import { updateComponent } from "../helpers/update.js";

export const getFavoritesBooksByOwner = async () => {
  try {
    const favourites = await firebase
      .firestore()
      .collection("favorites")
      .where("owner", "==", store.param)
      .get();

    const container = document.querySelector(".bookshelf__books");
    updateComponent(container, "");

    favourites.forEach(async (doc) => {
      const data = doc.data();
      const book = await fetchData(
        `https://www.googleapis.com/books/v1/volumes/${data.book}`,
      );
      container.insertAdjacentHTML(
        "afterbegin",
        BookCard({
          info: book,
          owner: data.owner,
          isPrivate: data.private,
          favorId: doc.id,
        }),
      );
    });
  } catch (error) {
    console.error(`Fetching book responses error: ${error.message}`);
  }
};
