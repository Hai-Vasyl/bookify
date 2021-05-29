import { fetchData } from "../helpers/fetchData.js";
import { store } from "../context/main.js";
import Section from "../components/Section.js";
import Link from "../components/Link.js";
import ResponseForm from "../components/ResponseForm.js";
import Response from "../components/Response.js";
import { btn } from "../datasets/main.js";

const Book = async () => {
  const bookData = await fetchData(
    `https://www.googleapis.com/books/v1/volumes/${store.param}`,
  );

  const responses = [
    {
      id: "1",
      user: {
        ava: "",
        color: "#833EF3",
        firstname: "Some",
        lastname: "User",
      },
      content:
        "Хотите научиться писать эффективные пользовательские интерфейсы при помощи React?",
      date: new Date(),
    },
    {
      id: "2",
      user: {
        ava: "",
        color: "#833EF3",
        firstname: "Some",
        lastname: "User",
      },
      content:
        "Хотите научиться писать эффективные пользовательские интерфейсы при помощи React?",
      date: new Date(),
    },
    {
      id: "4",
      user: {
        ava: "",
        color: "#833EF3",
        firstname: "Some",
        lastname: "User",
      },
      content:
        "Хотите научиться писать эффективные пользовательские интерфейсы при помощи React?",
      date: new Date(),
      response: "1",
    },
    {
      id: "5",
      user: {
        ava: "",
        color: "#833EF3",
        firstname: "Some",
        lastname: "User",
      },
      content:
        "Хотите научиться писать эффективные пользовательские интерфейсы при помощи React?",
      date: new Date(),
      response: "1",
    },
    {
      id: "3",
      user: {
        ava: "",
        color: "#833EF3",
        firstname: "Some",
        lastname: "User",
      },
      content:
        "Хотите научиться писать эффективные пользовательские интерфейсы при помощи React?",
      date: new Date(),
    },
  ];

  // try {
  //   await firebase
  //     .firestore()
  //     .collection("responses")
  //     .where("book", "==", store.param)
  //     .onSnapshot((snapshot) => {
  //       snapshot.forEach(async (doc) => {
  //         const data = doc.data();
  //         const user = await firebase
  //           .firestore()
  //           .collection("users")
  //           .doc(data.owner)
  //           .get();
  //         console.log("User document data:", user.data());
  //         console.log(doc.id, " => ", data);
  //       });
  //     });
  // } catch (error) {
  //   console.error(`Fetching book responses error: ${error.message}`);
  // }

  console.log({ bookData });

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

  const responseElems = responses.reduce(
    (acumulator, { id, user, content, date, response }) => {
      if (response) {
        return acumulator;
      }

      let resItem = Response({ id, user, content, date });
      responses.forEach((elem) => {
        if (elem.response === id) {
          console.log(elem.response === id, elem.response, id);
          resItem += Response({
            user: elem.user,
            content: elem.content,
            date: elem.date,
            className: "response-item-answer",
          });
        }
      });

      return acumulator + resItem;
    },
    "",
  );

  return `
    <div class="book" >
      ${
        bookData
          ? `
        <header class="book__header">
          <div class="book__container">
            <div class="book__preview">
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
        <section class="book__responses">
          ${responseForm}
          ${responseElems}
        </section>
        `
          : `<p class="plug" >Nothing found, try something else</p>`
      }
    </div>
  `;
};

export default Book;
