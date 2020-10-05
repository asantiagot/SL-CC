import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@material-ui/icons/Delete";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

interface IEmailViewerProps {
  singleEmail: any;
  removeItem: (id: string) => void;
  starEmail: (id: string) => void;
  starredEmails: any;
}

const Header = styled.div`
  height: fit-content;
  margin: 0 32px;
  padding: 16px 0;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  font-size: 14px;
  background: white;
  border: 1px solid #dadada;
  border-radius: 4px;
  padding: 8px;
  color: #5f6368;
  margin-right: 8px;

  :hover {
    cursor: pointer;
    background: #5f6368;
    color: white;
    border: 1px solid transparent;
  }
`;

const ButtonIcon = styled.span`
  margin-right: 4px;
  display: flex;
`;

const Title = styled.p`
  font-size: 14px;
  margin-bottom: 8px;
`;

const Sender = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const Time = styled.p`
  text-align: right;
  font-size: 14px;
`;

const BodyHeader = styled.div`
  margin: 0 32px;
  padding: 16px 0;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  justify-content: space-between;
`;

const Recipient = styled.p`
  font-size: 14px;
`;

const DateAndTime = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
    width: 30px;
    height: 30px;
    background: #c6c6c6;
    border-radius: 50%;
    margin-left: 16px;
  }
`;

const Body = styled.div`
  margin: 16px 32px;
  font-size: 14px;
  line-height: 24px;
`;

export const SingleEmail: FunctionComponent<IEmailViewerProps> = ({
  singleEmail,
  removeItem,
  starredEmails,
  starEmail,
}) => {
  let history = useHistory();

  const handleClick = () => {
    history.push("/inbox");
  };

  const handleDelete = () => {
    handleClick();
    removeItem(singleEmail.id);
  };

  const parsedDate = new Date(singleEmail.date);
  const day = parsedDate.toLocaleDateString("default", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
  const time = parsedDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isFilled =
    starredEmails.filter(
      (starredEmail: any) => starredEmail.id === singleEmail.id
    ).length > 0;

  return (
    <>
      <Header data-testid='singleEmail-header'>
        <Button onClick={handleClick}>
          <ButtonIcon>
            <ArrowBackIcon fontSize="small" />
          </ButtonIcon>
          Back
        </Button>
        <Button onClick={handleDelete}>
          <ButtonIcon>
            <DeleteIcon fontSize="small" />
          </ButtonIcon>
          Delete
        </Button>
        <Button onClick={() => starEmail(singleEmail.id)}>
          <ButtonIcon data-testid='star-button'>
            {isFilled ? (
              <StarIcon fontSize="small" />
            ) : (
              <StarBorderIcon fontSize="small" />
              )}
          </ButtonIcon>
            
            Star this email
        </Button>
      </Header>
      <div>
        <BodyHeader>
          <div>
            <Sender>{singleEmail.sender}</Sender>
            <Title>{singleEmail.subject}</Title>
            <Recipient>To: SalesLoft</Recipient>
          </div>
          <DateAndTime>
            <Time>{`${day} ${time}`}</Time>
            <Avatar />
          </DateAndTime>
        </BodyHeader>
        <Body dangerouslySetInnerHTML={{ __html: singleEmail.body }} />
      </div>
    </>
  );
};
