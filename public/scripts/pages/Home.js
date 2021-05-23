import Link from "../components/Link.js";
import SearchForm from "../components/SearchForm.js";
import { btn } from "../datasets/main.js";

const Home = () => {
  const searchForm = SearchForm();
  const btnExplore = Link({
    title: "Explore Shelves",
    href: "/explore",
    className: btn.prime,
  });
  const btnAbout = Link({
    title: "About Us",
    href: "/about",
    className: btn.second,
  });

  return `
    <div class="hero__bg"></div>
    <div class="hero" >
      <div class="hero__info">
        <h1 class="hero__title">Your new <span class="hero__accent">reading</span> expirience</h1>
        <p class="hero__paragraph">Here you can find books for any taste</p>
        ${searchForm}
        <div class="hero__btns">
          ${btnExplore + btnAbout}
        </div>
      </div>
      <div class="hero__image">
        <img src="/../images/hero_image.svg" alt="Hero image" />
      </div>
    </div>
  `;
};

export default Home;
