import { fetchData } from "../helpers/fetchData.js";
import { store } from "../context/main.js";
import Section from "../components/Section.js";
import Link from "../components/Link.js";
import ResponseForm from "../components/ResponseForm.js";
import Response from "../components/Response.js";
import { btn } from "../datasets/main.js";
import { updateComponent } from "../helpers/update.js";

const setResponse = async ({
  elem,
  place,
  params: { owner, content, id, date, isResponse },
}) => {
  const user = await firebase.firestore().collection("users").doc(owner).get();

  let record = {
    user: { id: user.id, ...user.data() },
    content,
    date,
  };

  if (isResponse) {
    record = { ...record, id };
  } else {
    record = { ...record, dataId: id, className: "response-item-answer" };
  }

  elem.insertAdjacentHTML(place, Response(record));
};

const Book = async () => {
  const bookData = await fetchData(
    `https://www.googleapis.com/books/v1/volumes/${store.param}`,
  );

  try {
    await firebase
      .firestore()
      .collection("responses")
      .where("book", "==", store.param)
      .onSnapshot(async (snapshot) => {
        const container = document.querySelector(".book__container-responses");
        updateComponent(container, "");

        await snapshot.forEach(async (doc) => {
          const data = doc.data();

          if (data.response) {
            return;
          }

          await setResponse({
            elem: container,
            place: "afterbegin",
            params: {
              owner: data.owner,
              content: data.content,
              id: doc.id,
              date: new Date(),
              isResponse: true,
            },
          });

          snapshot.forEach(async (item) => {
            const reply = item.data();

            if (doc.id === reply.response) {
              const sibling = container.querySelector(`#${doc.id}`);

              await setResponse({
                elem: sibling,
                place: "afterend",
                params: {
                  owner: reply.owner,
                  content: reply.content,
                  id: item.id,
                  date: new Date(),
                },
              });
            }
          });
        });
      });
  } catch (error) {
    console.error(`Fetching book responses error: ${error.message}`);
  }

  try {
    await firebase
      .firestore()
      .collection("favorites")
      .where("book", "==", store.param)
      .where("owner", "==", store.user.uid)
      .onSnapshot((snapshot) => {
        const btn = document.querySelector(".book__bookmark span");
        btn.parentNode.classList.remove("book__bookmark--active");
        btn.textContent = "bookmark_add";
        snapshot.forEach((doc) => {
          if (doc.id) {
            btn.parentNode.classList.add("book__bookmark--active");
            btn.textContent = "bookmark_added";
          }
        });
      });
  } catch (error) {
    console.error(`Fetching book state error: ${error.message}`);
  }

  const categories = Section({
    label: "Categories",
    body: bookData.volumeInfo.categories.reduce((acumulator, item, index) => {
      const elem = !index ? item : ` ${item}`;
      return acumulator + elem;
    }, ""),
  });
  const printType = Section({
    label: "Print type",
    body: bookData.volumeInfo.printType,
  });
  const authors = Section({
    label: "Authors",
    body: bookData.volumeInfo.authors.reduce((acumulator, item, index) => {
      const elem = !index ? item : ` ${item}`;
      return acumulator + elem;
    }, ""),
  });
  const description = Section({
    label: "Description",
    body: bookData.volumeInfo.description,
  });
  const datePublish = Section({
    label: "Published date",
    body: bookData.volumeInfo.publishedDate,
  });
  const pageCount = Section({
    label: "Page count",
    body: bookData.volumeInfo.pageCount,
  });
  const language = Section({
    label: "Language",
    body: bookData.volumeInfo.language,
  });
  const price = Section({
    label: "Price",
    body: `${bookData.saleInfo.listPrice.amount} ${bookData.saleInfo.listPrice.currencyCode}`,
  });

  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < bookData.volumeInfo.averageRating) {
      stars.push(
        `<span class="material-icons-outlined book__rate book__rate--active">star</span>`,
      );
    } else {
      stars.push(`
        <span class="material-icons-outlined book__rate">
          star_border
        </span>`);
    }
  }
  const rating = stars.reduce((acumulator, item) => {
    return acumulator + item;
  }, "");

  const btnRead = Link({
    title: "Read",
    href: bookData.accessInfo.webReaderLink,
    className: btn.prime,
    icon: "library_books",
    isExternal: true,
  });
  const btnBuy = Link({
    title: "Buy",
    href: bookData.saleInfo.buyLink,
    className: btn.second,
    icon: "shopping_cart",
    isExternal: true,
  });
  const btnMore = Link({
    title: "More info",
    href: bookData.volumeInfo.infoLink,
    className: btn.simple,
    isExternal: true,
  });
  const responseForm = ResponseForm();

  return `
    <div class="book" >
      ${
        bookData
          ? `
        <header class="book__header">
          <div class="wrapper book__container">
            <div class="book__preview">
              <button class="book__bookmark">
                <span class="material-icons-outlined sealed">
                  bookmark_add
                </span>
              </button>
              <img src="${
                bookData.volumeInfo.imageLinks.thumbnail
              }" alt="Preview book image" />
            </div>
            <div class="book__info">
              <div class="book__sections">
                <h1 class="book__title">${bookData.volumeInfo.title}</h1>
                ${categories + printType}
                <div class="book__rating">${rating}</div>
                ${description + price}
                <div class="book__btns">
                  ${btnRead + btnBuy + btnMore}
                </div>
                ${authors + datePublish + pageCount + language}
              </div>
            </div>
          </div>
        </header>
        <section class="wrapper book__responses">
          ${responseForm}
          <div class="book__container-responses"></div>
        </section>
        `
          : `<p class="plug" >Nothing found, try something else</p>`
      }
    </div>
  `;
};

export default Book;
