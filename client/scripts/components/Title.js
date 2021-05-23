const Title = ({ title, subtitle }) => {
  return `
    <div class="title">
      <h2 class="title__text">${title}</h2>
      ${subtitle ? `<span class="title__info">${subtitle}</span>` : ""}
    </div>
  `;
};

export default Title;
