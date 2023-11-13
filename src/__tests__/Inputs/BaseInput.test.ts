import {
  render,
  screen,
  RenderOptions,
  fireEvent,
  getByText,
} from "@testing-library/vue";
import BaseInput from "@/components/Inputs/BaseInput.vue";
import { test, it, expect, describe } from "@jest/globals";

describe("BaseInput", () => {
  it("renders label when label prop is provided", async () => {
    const options: RenderOptions = {
      props: {
        label: "Test Label",
      },
    };

    const { getByText } = render(BaseInput, options);

    expect(getByText("Test Label")).toBeTruthy();
  });

  it("does not render label when label prop is not provided", async () => {
    const { queryByLabelText } = render(BaseInput);

    expect(queryByLabelText("Test Label")).toBeNull();
  });

  it("updates modelValue on input change", async () => {
    const { getByRole } = render(BaseInput);

    const input = getByRole("textbox") as HTMLInputElement;
    await fireEvent.update(input, "New Value");

    expect(input.value).toBe("New Value");
  });
});
