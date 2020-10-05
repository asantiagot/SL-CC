import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import { AllEmails } from "./AllEmails";
import { BrowserRouter } from "react-router-dom";

const getProps = () => ({
  removeItem: jest.fn(),
  starEmail: jest.fn(),
  starredEmails: [{}],
  emails: [{}],
  deletedEmails: [{}],
  filteredEmails: [{}]
})

it("stars an email", () => {
  const props = getProps()

  const { getByTestId } = render(
    <BrowserRouter>
      <AllEmails {...props} />
    </BrowserRouter>
  );

  fireEvent.click(getByTestId('star-button'))

  expect(props.starEmail).toHaveBeenCalled()
});

it("deletes an email", () => {
  const props = getProps()

  const { getByTestId } = render(
    <BrowserRouter>
      <AllEmails {...props} />
    </BrowserRouter>
  );

  fireEvent.click(getByTestId('delete-button'))

  expect(props.removeItem).toHaveBeenCalled()
});
