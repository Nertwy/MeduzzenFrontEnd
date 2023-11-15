import { render, screen, RenderOptions, fireEvent } from "@testing-library/vue";
import { it, expect, describe } from "@jest/globals";
import MultiInput from "@/components/Inputs/MultiInput.vue";
describe("Multi Input", () => {
  it("render multi input and check update function", () => {
    const options: RenderOptions = {
      props: {
        data: {
          id: 23,
          name: "some guy",
          lastName: "Very positive",
        },
        wrapperTag: "td",
        disableInputsByKeys: ["some"],
      },
    };
    const { debug, getAllByRole, getByRole } = render(MultiInput, options);
    const inputs = getAllByRole("textbox") as HTMLInputElement[];
    expect(inputs).toHaveLength(3);

    fireEvent.update(inputs[1], "Cool stuff");
    expect(inputs[1].value).toEqual("Cool stuff");
    const wrapperComponent = getAllByRole("list");
    expect(wrapperComponent).toHaveLength(3);
  });
});
