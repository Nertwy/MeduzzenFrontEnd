import { render, screen, RenderOptions, fireEvent } from "@testing-library/vue";
import QuizForm from "@/components/FormComponents/QuizForm.vue";
import { expect, test } from "@jest/globals";
test("renders quiz form", async () => {
  const { getByPlaceholderText, getByText } = render(QuizForm, {
    props: {
      companyId: 1, // Add any required props here
    },
  });

  await fireEvent.update(
    getByPlaceholderText("Write a quiz title"),
    "Sample Quiz Title"
  );
  await fireEvent.update(
    getByPlaceholderText("Write a quiz description"),
    "Sample Quiz Description"
  );

  fireEvent.click(getByText("Add question"));

  await fireEvent.update(
    getByPlaceholderText("Question №1"),
    "Sample Question"
  );

  const form = screen.getByRole("form") as HTMLFormElement;
  fireEvent.click(getByText("Create Quiz"));
});
