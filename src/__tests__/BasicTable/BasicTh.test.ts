import { render, screen, RenderOptions } from "@testing-library/vue";
import BasicTh from "@/components/BasicTable/BasicTh.vue";
import { test, it, expect } from "@jest/globals";

it("should render all keys when excludeId is false", () => {
  const options: RenderOptions = {
    props: {
      keys: ["id", "name", "age", "last name"],
      excludeId: false,
    },
  };
  render(BasicTh, options);

  const thElements = screen.getAllByRole("rowheader");
  expect(thElements).toHaveLength(4);
  expect(thElements[0].textContent).toBe("id");
  expect(thElements[1].textContent).toBe("name");
  expect(thElements[2].textContent).toBe("age");
  expect(thElements[3].textContent).toBe("last name");
});

it("should not render the 'id' key when excludeId is true", () => {
  const options: RenderOptions = {
    props: {
      keys: ["id", "name", "last name"],
      excludeId: true,
    },
  };
  render(BasicTh, options);
  const thElements = screen.getAllByRole("rowheader");
  expect(thElements[0].textContent).toBe("name");
  expect(thElements[1].textContent).toBe("last name");
});
