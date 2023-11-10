import { render } from "@testing-library/vue";
import BasicButton from "../../components/buttons/BasicButton.vue";
import { test } from "@jest/globals";
test("render basic button", () => {
  const { debug } = render(BasicButton);
  debug();
});
