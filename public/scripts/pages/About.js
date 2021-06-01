import Title from "../components/Title.js";

const About = () => {
  const title = Title({
    title: "About Us",
    subtitle: "Learn more about this app",
  });

  return `
  <div class="about">
    <header class="wrapper about__title" >
      ${title}
    </header>
    <div class="wrapper about__body">
      <div class="about__info">
      <p>
        The application is built on pure web technologies without frameworks and libraries. This solution was created on SPA architecture and it is based on a serverless approach from firebase. The application uses the Google Books API, which will provide a database of books. <br/><br/>
  Here you can share your bookshelf and follow the bookshelves of other users. You can leave a response on the book, add the book to your own bookshelf and if you want can buy and read more detailed information about this book. This app has powerful searching engine and can sort and filter any query you ask. Explore page, except filter tools, has pagination and if you click on book interested you, it redirects you to book details page with its rating and list of responses. <br/><br/>Each user has his own personal profile page where he can manage bookshelf and his personal data. The administrator of this app has extra privileges, such as deleting users on users page and deleting responses on book details page
  </p>    
  </div>
      <div class="about__image">
        <img src="/../images/about_image.svg" alt="" />
      </div>
    </div>
  </div>
  `;
};

export default About;
