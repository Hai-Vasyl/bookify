const Avatar = ({ user }) => {
  console.log({ user });
  return user.ava
    ? `
    <img class="avatar" src="${user.ava}" alt="User avatar"/>
  `
    : `
    <span
      class="avatar"
      style="background-color: ${user.color}"
    >
      <span class='avatar__firstname'>
        ${user.firstname[0]}
      </span>
      <span class='avatar__lastname'>
        ${user.lastname[0]}
      </span>
    </span>
  `;
};

export default Avatar;
