const Avatar = ({ user, middle, large }) => {
  return user.ava
    ? `
    <img class="avatar sealed" src="${user.ava}" alt="User avatar"/>
  `
    : `
    <span
      class="avatar sealed"
      style="background-color: ${user.color}"
    >
      <span class="avatar__letters ${middle ? "avatar__letters--middle" : ""} ${
        large ? "avatar__letters--large" : ""
      } sealed">
        <span class='avatar__letter avatar__firstname'>
          ${user.firstname ? user.firstname[0] : ""}
        </span>
        <span class='avatar__letter avatar__lastname'>
          ${user.lastname ? user.lastname[0] : ""}
        </span>
      </span>
    </span>
  `;
};

export default Avatar;
