import { store } from "../context/main.js";

const BookCard = ({ info, isPrivate, owner, favorId }) => {
  return store.user.uid === store.param || !isPrivate
    ? `
<div class="card">
  <a href="/volume/${info.id}" class="card__link" data-link>
    <span class="card__overlay sealed">
      <span>
        <span class="material-icons-outlined card__icon">
          collections_bookmark
        </span>
        <span class="card__more">More info</span>
      </span>
    </span>
    ${
      info.volumeInfo.imageLinks?.thumbnail
        ? `<img class="card__thumbnail sealed" src="${info.volumeInfo.imageLinks.thumbnail}" alt="Book thumbnail" />`
        : `<span class="material-icons-outlined card__plug-image sealed">auto_stories</span>`
    }
  </a>
  <div class="card__header">
    ${
      store.user.uid === owner
        ? `<div class="card__check">
            <button class="card__checkbox" data-btn-check-private="${favorId}">${
            isPrivate
              ? `<span class="material-icons-outlined sealed">
                done
              </span>`
              : ""
          }
            </button>
            <span class="card__label">Make private</span>
          </div>`
        : ""
    }
    <a class="card__title" href="/volume/${info.id}" data-link>${
        info.volumeInfo.title
      }</a>
  </div>
  <div>
    <span class="card__subtitle">${info.volumeInfo.publishedDate}</span>
  </div>
</div>
`
    : "";
};

export default BookCard;
