import { store } from "../context/main.js";

export const getLinks = () => {
  const isAuth = !!store.user.uid;

  return [
    {
      title: "Explore",
      href: "/explore",
      icon: "explore",
    },
    {
      title: "About",
      href: "/about",
      icon: "info",
    },
    {
      title: "Users",
      href: "/users",
      icon: "people",
    },
    {
      title: "Favourites",
      isBtn: !isAuth,
      href: isAuth ? `/favourites/${store.user.uid}` : "",
      icon: "favorite_border",
    },
    {
      title: "Profile",
      isBtn: !isAuth,
      isBottom: true,
      href: isAuth ? `/user/${store.user.uid}` : "",
      icon: "account_circle",
    },
  ];
};
