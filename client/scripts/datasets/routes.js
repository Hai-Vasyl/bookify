import { store } from "../store/main.js";

import Home from "../pages/Home.js";
import About from "../pages/About.js";
import Favourites from "../pages/Favourites.js";
import Profile from "../pages/Profile.js";
import Users from "../pages/Users.js";
import Book from "../pages/Book.js";

const routes = [
  { path: "/", title: "Home", component: Home },
  { path: "/about", title: "About", component: About },
  { path: "/users", title: "All users", component: Users },
  { path: "/volume/:bookid", title: "Book", component: Book },
  { path: "/favourites/:userid", title: "Favourites", component: Favourites },
  { path: "/user/:userid", title: "My profile", component: Profile },
];

export const getRoutes = () => {
  switch (store.user.role) {
    case "admin":
      return [...routes];
    case "user":
      return [...routes];
    default:
      return [...routes];
  }
};
