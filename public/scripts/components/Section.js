const Section = ({ label, body, className = "" }) => {
  return `
    <div class="section ${className}">
      <span class="section__label" >${label}:</span>
      <span class="section__body">${body}</span>
    </div>
  `;
};

export default Section;
