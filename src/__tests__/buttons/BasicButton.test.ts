import { render, screen, RenderOptions } from "@testing-library/vue";
import BasicButton from "../../components/buttons/BasicButton.vue";
import { test } from "@jest/globals";
test("render basic button", () => {
  const options: RenderOptions = {
    slots: {
      default: "Test Button",
    },
  };

  const { debug } = render(BasicButton, options);
  debug();
});
