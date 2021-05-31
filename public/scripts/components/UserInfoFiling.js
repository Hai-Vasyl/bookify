import Avatar from "./Avatar.js";

const UserInfoFiling = ({ user, isFull, reversed, className = "" }) => {
  const userAvatar = Avatar({ user });
  const { firstname, lastname, role } = user;
  return ` 
    <span class="user-info-filling ${
      reversed ? "user-info-filling--reversed" : ""
    } ${className} sealed" >
      <span class="user-info-filling__title">
          ${isFull ? `${firstname} ${lastname}` : firstname[0] + lastname[0]}
      </span>
      <span class="user-info-filling__avatar ${
        role === "admin" ? "admin" : ""
      }">${userAvatar}</span>
    </span>
  `;
};

export default UserInfoFiling;
