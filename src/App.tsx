import React, { FunctionComponent, useState } from "react";
import { BrowserRouter, Redirect } from "react-router-dom";

import styled from "styled-components";

import Emails from "./Helpers/emails.json";

import { NavBar } from "./Components/NavBar";
import { SideNav } from "./Components/SideNav";
import { EmailViewer } from "./Components/EmailViewer/EmailViewer";

const SideNavAndEmails = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    max-height: 100vh;
    max-width: 1440px;
  }
`;

export const App: FunctionComponent = () => {
  const [emails, setEmails] = useState(Emails.messages);
  const [deletedEmails, setDeletedEmails] = useState(Array);
  const [starredEmails, setStarredEmails] = useState(Array);
  const [filteredEmails, setFilteredEmails] = useState(Array);

  const filterEmails = (tag: any) => {
    if (tag === "all") {
      return;
    }

    setFilteredEmails(
      Emails.messages.filter((email) => email.tags.includes(tag))
    );
  };

  const removeItem = (id: any) => {
    setEmails((emails) => [...emails].filter((email) => email.id !== id));
    alert("Your email was removed");
    const newlyDeletedEmail = emails.filter((email) => email.id === id)[0];
    setDeletedEmails((deletedEmails) => [...deletedEmails, newlyDeletedEmail]);
  };

  const starEmail = (id: any) => {
    if (starredEmails.filter((email: any) => email.id === id).length > 0) {
      return setStarredEmails((starredEmails: any) =>
        starredEmails.filter((email: any) => email.id !== id)
      );
    }

    const newlyStarredEmail = emails.filter((email) => email.id === id)[0];
    setStarredEmails((starredEmails) => [...starredEmails, newlyStarredEmail]);
    alert("You starred this email");
  };

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <SideNavAndEmails>
          <SideNav filterEmails={filterEmails} />
          <EmailViewer
            emails={emails}
            removeItem={removeItem}
            deletedEmails={deletedEmails}
            starEmail={starEmail}
            starredEmails={starredEmails}
            filteredEmails={filteredEmails}
          />
        </SideNavAndEmails>
      </div>
      <Redirect exact from={"/"} to={"/inbox"}></Redirect>
    </BrowserRouter>
  );
};
