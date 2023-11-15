import { render, screen, RenderOptions } from "@testing-library/vue";
import { test, it, expect, describe } from "@jest/globals";
import BasicTd from "@/components/BasicTable/BasicTd.vue";

describe("Basic Td tag", () => {
  it("Render td component without custom td component wrapper", () => {
    const options: RenderOptions = {
      props: {
        data: {
          name: "Denis",
          age: 20,
          someStuff: "Yes",
        },
        edit: false,
      },
    };
    const { getAllByRole, debug } = render(BasicTd, options);
    debug();
    expect(getAllByRole("row")).toHaveLength(3);
  });
  it("Render td with boolean values", () => {
    const options: RenderOptions = {
      props: {
        data: {
          name: "Denis",
          age: 20,
          someStuff: "Yes",
          isAdmin: true,
          isOwner: false,
        },
        edit: false,
      },
    };
    const { getAllByRole, debug } = render(BasicTd, options);
    expect(getAllByRole("row")).toHaveLength(3);
    expect(getAllByRole("textbox")).toHaveLength(2);
  });
});
