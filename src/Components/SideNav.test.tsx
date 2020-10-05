import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SideNav } from "./SideNav";
import { BrowserRouter } from "react-router-dom";

const getProps = () => ({
  filterEmails: jest.fn()
})

it("renders a list of menu items", () => {
  const { getAllByTestId } = render(
    <BrowserRouter>
      <SideNav {...getProps()} />
    </BrowserRouter>
  );

  expect(getAllByTestId("menu-item")).toHaveLength(6);
});

it('calls the filterEmails function onClick', () => {
  const props = getProps()

  const { getByText } = render(
    <BrowserRouter>
      <SideNav {...props} />
    </BrowserRouter>
  );

  fireEvent.click(getByText('Inbox'))

  expect(props.filterEmails).toHaveBeenCalled()
})