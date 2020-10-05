import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";

import StarBorderIcon from "@material-ui/icons/StarBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import StarIcon from "@material-ui/icons/Star";

interface IEmailViewerProps {
  emails: any;
  removeItem: (id: string) => void;
  deletedEmails: any;
  starEmail: (id: string) => void;
  starredEmails: any;
  filteredEmails: any;
}

const EmailViewerContainer = styled.div`
  max-height: 100%;
  overflow: scroll;
  width: 100%;
`;

const Placeholder = styled.p`
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 24px;
  position: absolute;
  top: 50%;
  color: #5f6368;

  @media (min-width: 768px) {
    left: 50%;
    width: inherit;
  }
`;

const Sender = styled.p`
  max-width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 16px;

  @media (min-width: 768px) {
    margin-right: 90px;
    max-width: 144px;
  }
`;
const Subject = styled.p`
  text-align: left;
  max-width: 90px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 768px) {
    max-width: 268px;
  }

  @media (min-width: 1080px) {
    max-width: 650px;
  }
`;
const StyledDate = styled.p`
  max-width: 60px;
  margin-left: auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 768px) {
    max-width: 100px;
  }
`;

const Item = styled.li`
  display: flex;
  border: 1px solid #e2e2e2;
`;

const Button = styled.button`
  width: 100%;
  display: flex;
  padding: 12px;
  border: 1px solid transparent;
  position: relative;
  color: #5f6368;
  background: #f5f7f7;

  :hover {
    cursor: pointer;
    box-shadow: 0px 2px 5px 0px rgba(198, 198, 198, 1);
    z-index: 1;
  }

  ${Sender}, ${Subject}, ${Date} {
    font-size: 14px;
  }
`;

const ActionButton = styled.button`
  background: transparent;
  border: none;
  background: #f5f7f7;
  color: #5f6368;

  :hover {
    cursor: pointer;
  }
`;

const ScreenReaderText = styled.p`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;
export const AllEmails: FunctionComponent<IEmailViewerProps> = ({
  emails,
  removeItem,
  deletedEmails,
  starEmail,
  starredEmails,
  filteredEmails,
}) => {
  let history = useHistory();
  let location = useLocation();

  const splitPathname = location.pathname.split("/");
  const checkPathname = (page: string) => splitPathname.includes(page);

  const isTrash = checkPathname("trash");

  const isStarred = checkPathname("starred");

  const isFiltered = checkPathname("work") || checkPathname("travel");

  const pageView = isTrash
    ? deletedEmails
    : isStarred
    ? starredEmails
    : isFiltered
    ? filteredEmails
    : emails;

  const emailItems = pageView.map((email: any) => {
    const parsedDate = new Date(email.date);
    const month = parsedDate.toLocaleString("default", { month: "long" });
    const day = parsedDate.getDate();

    const isFilled =
      starredEmails.filter((starredEmail: any) => starredEmail.id === email.id)
        .length > 0;

    const handleClick = (email: any) => {
      history.push(`/${splitPathname[1]}/${email.id}`);
    };

    return (
      <Item key={email.id}>
        <ActionButton
          onClick={() => removeItem(email.id)}
          data-testid="delete-button"
          aria-label='delete this email'
        >
          <DeleteIcon fontSize="small" />
          <ScreenReaderText>Delete this email</ScreenReaderText>
        </ActionButton>
        <ActionButton
          onClick={() => starEmail(email.id)}
          data-testid="star-button"
          aria-label='star this email'
        >
          <ScreenReaderText>Star this email</ScreenReaderText>
          {isFilled ? (
            <StarIcon fontSize="small" />
          ) : (
            <StarBorderIcon fontSize="small" />
          )}
        </ActionButton>
        <Button data-testid="select-email" onClick={() => handleClick(email)}>
          <Sender>{email.sender}</Sender>
          <Subject>{email.subject}</Subject>
          <StyledDate>
            {month} {day}
          </StyledDate>
        </Button>
      </Item>
    );
  });

  return (
    <EmailViewerContainer>
      <ul>
        {emailItems.length === 0 ? (
          <Placeholder>No emails found</Placeholder>
        ) : (
          emailItems
        )}
      </ul>
    </EmailViewerContainer>
  );
};
