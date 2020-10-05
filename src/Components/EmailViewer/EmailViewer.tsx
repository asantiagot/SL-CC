import React, { FunctionComponent, useState, useEffect } from "react";
import styled from "styled-components";
import { AllEmails } from "./AllEmails";
import { SingleEmail } from "./SingleEmail";
import { useLocation } from "react-router-dom";

interface IEmailViewerProps {
  emails: any;
  removeItem: (id: string) => void;
  deletedEmails: any;
  starEmail: (id: string) => void;
  starredEmails: any;
  filteredEmails: any;
}

const EmailViewerContainer = styled.div`
  @media (min-width: 768px) {
    width: 85%;
  }
`;

export const EmailViewer: FunctionComponent<IEmailViewerProps> = ({
  emails,
  removeItem,
  deletedEmails,
  starEmail,
  starredEmails,
  filteredEmails,
}) => {
  let location = useLocation();

  const [singleEmail, setSingleEmail] = useState(null);

  useEffect(() => {
    if (location.pathname.split("/").length > 2) {
      setSingleEmail(
        emails.filter(
          (email: any) => email.id === location.pathname.split("/")[2]
        )[0]
      );
    } else {
      setSingleEmail(null);
    }
  }, [location.pathname, emails]);

  console.log(typeof emails)
  return (
    <EmailViewerContainer>
      {singleEmail ? (
        <SingleEmail
          singleEmail={singleEmail}
          removeItem={removeItem}
          starredEmails={starredEmails}
          starEmail={starEmail}
        />
      ) : (
        <AllEmails
          emails={emails}
          removeItem={removeItem}
          deletedEmails={deletedEmails}
          starEmail={starEmail}
          starredEmails={starredEmails}
          filteredEmails={filteredEmails}
        />
      )}
    </EmailViewerContainer>
  );
};
