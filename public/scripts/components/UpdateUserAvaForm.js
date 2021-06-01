import Field from "./Field.js";
import Button from "./Button.js";
import { btn } from "../datasets/main.js";

const UpdateUserAvaForm = () => {
  const form = [{ id: "external-img", label: "Image url" }];

  const fields = form.reduce((acumulator, { id, label }) => {
    return (
      acumulator +
      Field({
        id,
        label,
        required: true,
      })
    );
  }, "");

  const btnSubmit = Button({
    title: "Apply",
    className: btn.prime,
    icon: "done",
  });

  return `
    <form id="form-user-ava" class="form-auth">
      <div class="form-auth__title">
        Updating User Image
      </div>
      <div class="form-auth__fields">${fields}</div>
      <div class="form-auth__btns">
        ${btnSubmit}
      </div>
    </form>
  `;
};

export default UpdateUserAvaForm;
