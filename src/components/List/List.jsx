import React, { useState, useEffect, createRef } from "react";
import styled from "styled-components";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const ListContainer = styled.div`
  // width: 100%;
`;
const TypographyStyled = styled.h4`
  margin: 10px;
  font-size: 1.1rem;
  display: block;
`;

const FormControlContainer = styled.div`
  display: inline-block;
  margin-bottom: 30px;
  padding: 5px;
`;

const SelectStyle = styled(Select)`
  border-bottom: 1px solid black;
`;

const GridStyle = styled(Grid)`
  overflow: auto;
  height: 75vh;
`;

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());

    setElRefs(refs);
  }, [places]);

  return (
    <ListContainer>
      <TypographyStyled>
        Restaurants, Hotels & Attractions around you
      </TypographyStyled>
      {isLoading ? (
        <div>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControlContainer>
            <InputLabel>Type</InputLabel>
            <SelectStyle value={type} onChange={e => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </SelectStyle>
          </FormControlContainer>
          <FormControlContainer>
            <InputLabel>Rating</InputLabel>
            <SelectStyle
              value={rating}
              onChange={e => setRating(e.target.value)}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </SelectStyle>
          </FormControlContainer>
          <GridStyle container spacing={3}>
            {places?.map((place, index) => (
              <Grid ref={elRefs[index]} item key={index} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) === index}
                  refProp={elRefs[index]}
                />
              </Grid>
            ))}
          </GridStyle>
        </>
      )}
    </ListContainer>
  );
};

export default List;
