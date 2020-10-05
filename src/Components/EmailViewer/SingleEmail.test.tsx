import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SingleEmail } from "./SingleEmail";
import { BrowserRouter } from "react-router-dom";

const getProps = () => ({
  singleEmail: [{}],
  removeItem: jest.fn(),
  starEmail: jest.fn(),
  starredEmails: [{}]
})

it("stars an email", () => {
  const props = getProps()

  const { getByTestId } = render(
    <BrowserRouter>
      <SingleEmail {...props} />
    </BrowserRouter>
  );

  fireEvent.click(getByTestId('star-button'))

  expect(props.starEmail).toHaveBeenCalled()
});

it("deletes an email", () => {
  const props = getProps()

  const { getByText } = render(
    <BrowserRouter>
      <SingleEmail {...props} />
    </BrowserRouter>
  );

  fireEvent.click(getByText('Delete'))

  expect(props.removeItem).toHaveBeenCalled()
});