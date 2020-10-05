import React, { FunctionComponent } from "react";
import styled from "styled-components";

const NavBarContainer = styled.div`
  justify-content: center;
  display: flex;
  padding: 8px 16px;
  border-bottom: 1px solid #dadada;
  align-items: center; 

  @media (min-width: 768px) {
    justify-content: space-between;
  }
`;

const SearchBar = styled.input`
  display: none;
  
  @media (min-width: 768px) {
    display: block;
    border: 1px solid transparent;
    border-radius: 8px;
    background: #eeeeee;
    padding: 16px;
    font-size: 16px;
    color: black;

    ::placeholder {
      color: #5f6368;
      font-family: "roboto";
    }

    :focus {
      outline: none;
      border: 1px solid black;
    }
  }
`;

export const NavBar: FunctionComponent = () => {
  return (
    <NavBarContainer>
      <a href="/inbox">
        <img
          src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x.png"
          alt="Gmail logo"
        />
      </a>
      <SearchBar placeholder="Search mail" type="text" />
    </NavBarContainer>
  );
};
