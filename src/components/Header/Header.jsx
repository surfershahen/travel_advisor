import React, { useState } from "react";
//Apis Imports
import { Autocomplete } from "@react-google-maps/api";
// Styles Imports
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";

import { Search } from "@mui/icons-material";
import styled from "styled-components";

//Icons Imports

const TitleStyled = styled.div`
  position: relative;
  border-radius: 5px;
  padding-right: 10px;
  font-size: 1.2rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const SearchStyled = styled.div`
  position: relative;
  display: flex;

  @media screen and (max-width: 768px) {
  }
`;

const InputStyle = styled.input`
  transition: all 0.5s ease;
  padding: 5px;
  background-color: #aaa;
  color: inherit;
  border: none;
  border-radius: 5px;
  padding-left: 20px;
  @media screen and (max-width: 768px) {
    padding: 7px;
  }
`;

const ToolbarStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const BoxStyled = styled.div`
  display: flex;
`;

const Header = ({ setCoordinates }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = autoC => setAutocomplete(autoC);

  const onPLaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };

  return (
    <AppBar position="static">
      <ToolbarStyled>
        <TitleStyled>Travel Planner</TitleStyled>
        <BoxStyled>
          <TitleStyled>Explore new Places</TitleStyled>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPLaceChanged}>
            <SearchStyled>
              <InputStyle placeholder="Search..." />
            </SearchStyled>
          </Autocomplete>
        </BoxStyled>
      </ToolbarStyled>
    </AppBar>
  );
};

export default Header;
