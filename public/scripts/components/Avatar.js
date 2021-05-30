const Avatar = ({ user }) => {
  return user.ava
    ? `
    <img class="avatar sealed" src="${user.ava}" alt="User avatar"/>
  `
    : `
    <span
      class="avatar sealed"
      style="background-color: ${user.color}"
    >
      <span class='avatar__firstname sealed'>
        ${user.firstname[0]}
      </span>
      <span class='avatar__lastname sealed'>
        ${user.lastname[0]}
      </span>
    </span>
  `;
};

export default Avatar;
