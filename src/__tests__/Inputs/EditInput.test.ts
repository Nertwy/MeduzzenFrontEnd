import EditInput from "@/components/Inputs/EditInput.vue";
import { render, screen, RenderOptions } from "@testing-library/vue";
import { test, it, expect, describe } from "@jest/globals";
import MultiInput from "@/components/Inputs/MultiInput.vue";
describe("EditInput", () => {
  const options: RenderOptions = {
    props: {
      data: {
        id: 2,
        name: "user",
        email: "Some cool stuff@gmail.com",
      },
      edit: false,
    },
  };
  it("Render component without edit", () => {
    const { debug, getAllByRole } = render(EditInput, options);
    debug();
    const allFields = getAllByRole("gridcell");
    expect(allFields).toHaveLength(3);
  });
  it("Render component with edit", () => {
    const newOptions: RenderOptions = {
      props: {
        data: {
          id: 123,
          name: "Denis",
          lastName: "Super Last Name",
          email: "example@gmail.com",
          isAdmin: true,
        },
        disableInputsByKeys: ["id", "email"],
        edit: true,
      },
    };
    const { getAllByRole } = render(EditInput, newOptions);
    const editableInputs = getAllByRole("textbox") as HTMLInputElement[];
    expect(editableInputs).toHaveLength(3);
    expect(getAllByRole("list")).toHaveLength(5);
  });
});
