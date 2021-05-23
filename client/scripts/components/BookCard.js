const BookCard = ({ info }) => {
  return `
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
    <div>
      <a class="card__title" href="/volume/${info.id}" data-link>${
    info.volumeInfo.title
  }</a>
    </div>
    <div>
      <span class="card__subtitle">${info.volumeInfo.publishedDate}</span>
    </div>
  </div>
  `;
};

export default BookCard;
