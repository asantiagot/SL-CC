import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { mailboxItems, emailTags } from "../Helpers/MenuItems";

interface ISideNavProps {
  filterEmails: (filterType: string) => void;
}

interface IStyledItemProps {
  isActive: boolean;
  isInbox: boolean;
}

const ListTitle = styled.p`
  margin-bottom: 8px;

  font-size: 12px;
  color: #5f6368;

  @media (min-width: 768px) {
    margin-left: 16px;
    margin-bottom: 4px;
  }
`;

const SideNavContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: 2;
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #dadada;

  @media (min-width: 768px) {
    width: 250px;
    padding-left: 0;
    width: 15%;
    border-bottom: none;
  }
`;

const UL = styled.ul`
  display: flex;

  @media (min-width: 768px) {
    flex-direction: column;
  }
`;

const Mailboxes = styled.div`
  margin-bottom: 16px;
`;

const Icon = styled.span`
  margin-right: 2px;

  @media (min-width: 768px) {
    margin-right: 8px;
  }
`;

const Item = styled.li<IStyledItemProps>`
  width: fit-content;
  margin-right: 4px;

  .link {
    text-decoration: none;
    font-size: 14px;
    font-weight: ${({ isActive }) => isActive && "bold"};
    color: ${({ isActive, isInbox }) =>
      isInbox && isActive ? "#B23121" : "#5f6368"};
    display: flex;
    align-items: center;
  }

  @media (min-width: 768px) {
    width: 100%;
    padding: 8px 0 8px 32px;
    background: ${({ isActive, isInbox }) =>
      isActive && isInbox ? "#fce8e6" : isActive ? "#e8eaed" : ""};
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    box-sizing: border-box;
  }
`;

export const SideNav: FunctionComponent<ISideNavProps> = ({ filterEmails }) => {
  let location = useLocation();

  const items = mailboxItems.map((item) => {
    return (
      <Item
        isActive={location.pathname.includes(item.link)}
        isInbox={item.title === "Inbox"}
        key={item.title}
        onClick={() => filterEmails("all")}
        data-testid='menu-item'
      >
        <NavLink to={`/${item.link}`} className="link">
          <Icon>{item.icon}</Icon>
          {item.title}
        </NavLink>
      </Item>
    );
  });

  const EmailTagItems = emailTags.map((item) => {
    return (
      <Item
        isActive={location.pathname.includes(item.link)}
        isInbox={item.title === "Inbox"}
        key={item.title}
        onClick={() => filterEmails(item.link)}
        data-testid='menu-item'
      >
        <NavLink to={`/${item.link}`} className="link">
          <Icon>{item.icon}</Icon>
          {item.title}
        </NavLink>
      </Item>
    );
  });

  return (
    <SideNavContainer>
      <Mailboxes>
        <ListTitle>Mailboxes</ListTitle>
        <UL data-testid='mailbox-items'>{items}</UL>
      </Mailboxes>
      <ListTitle>Other</ListTitle>
      <UL>{EmailTagItems}</UL>
    </SideNavContainer>
  );
};
