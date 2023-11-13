import { render, screen, RenderOptions, fireEvent } from "@testing-library/vue";
import MultipleAnswerInput from "@/components/Inputs/MultipleAnswerInput.vue";
import { describe, it, expect } from "@jest/globals";
import { getByRole } from "@testing-library/vue";
describe("MultipleAnswerInput", () => {
  it("should render the correct number of answer choices", () => {
    const options: RenderOptions = {
      props: {
        data: {
          answers: ["Answer 1", "Answer 2", "Answer 3"],
          correct_answers: ["Answer 1"],
        },
        edit: false,
      },
    };
    render(MultipleAnswerInput, options);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("should not render elements", async () => {
    const options: RenderOptions = {
      props: {
        data: {
          answers: [],
          correct_answers: ["Answer 1", "Answer 2", "Answer 3"],
        },
        edit: true,
      },
    };

    render(MultipleAnswerInput, options);
    expect(screen.queryByRole("listitem")).toBeNull();
    const addAnswerChoiceButton = screen.getByText("Add answer choice");
    await fireEvent.click(addAnswerChoiceButton);
    expect(screen.getAllByRole("listitem")).toHaveLength(1);

    const removeAnswerChoiceButton = screen.getByText("Remove Answer");
    await fireEvent.click(removeAnswerChoiceButton);
    //?Check if element still there not less than 2 answers could be
    expect(screen.getAllByRole("listitem")).toHaveLength(1);

    await fireEvent.click(addAnswerChoiceButton);
    await fireEvent.click(addAnswerChoiceButton);
    await fireEvent.click(removeAnswerChoiceButton);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("should emit the updated answers when an answer choice is changed", async () => {
    const props: RenderOptions = {
      props: {
        data: {
          answers: ["ans 1", "ans 2", "ans 3"],
          correct_answers: [],
        },
        edit: true,
      },
    };

    render(MultipleAnswerInput, props);
    const inputFields = screen.getAllByRole("textbox") as HTMLInputElement[];
    const answerChoiceCheckboxes = screen.getAllByRole(
      "checkbox"
    ) as HTMLInputElement[];
    await fireEvent.update(inputFields[0], "New ans");
    expect(inputFields[0].value).toEqual("New ans");
    expect(answerChoiceCheckboxes[0].checked).toEqual(false);
    await fireEvent.click(answerChoiceCheckboxes[0]);
    expect(answerChoiceCheckboxes[0].value).toEqual("New ans");
  });
});
