import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@mui/material";
import { LocationOnOutlined } from "@mui/icons-material";
import { Rating } from "@mui/material";
import styled from "styled-components";
import mapStyle from "./mapStyle";

const MapContainerStyled = styled.div`
  height: 90vh;
  width: 100%;
  margin-top: 10px;

  @media screen and (max-width: 768px) {
    margin: 0;
    padding: 0;
  }
`;

const MarkerContainer = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 1;

  &:hover {
    z-index: 2;
  }
`;

const PaperStyled = styled(Paper)`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100px;
`;

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  weatherData,
}) => {
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <MapContainerStyled>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBbWlFMAFuWfKgN2xHLmze5b4Sw57iqAvw" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={9}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyle,
        }}
        onChange={e => {
          {
            console.log(e);
          }

          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={child => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <MarkerContainer
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDesktop ? (
              <LocationOnOutlined color="primary" fontSize="large" />
            ) : (
              <PaperStyled elevation={3}>
                <Typography variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                <img
                  style={{ cursor: "pointer" }}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.google.com/imgres?imgurl=https%3A%2F%2Ft3.ftcdn.net%2Fjpg%2F05%2F88%2F37%2F02%2F360_F_588370263_HxquwnQk1VkQjK1hJ6lZlnSDAEmNOwoS.jpg&tbnid=apFTk2iNEnZC-M&vet=12ahUKEwiE9Oe2h-iDAxVH6bsIHYFRBSUQMygJegQIARBZ..i&imgrefurl=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Dlaw%2Bof%2Battraction&docid=gLGQjRSiNHQx6M&w=540&h=360&q=attraction%20images&ved=2ahUKEwiE9Oe2h-iDAxVH6bsIHYFRBSUQMygJegQIARBZ"
                  }
                  alt="place-name"
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </PaperStyled>
            )}
          </MarkerContainer>
        ))}
        {weatherData?.list?.map((data, i) => (
          <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <img
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              height="70px"
              alt="weather-data"
            />
          </div>
        ))}
      </GoogleMapReact>
    </MapContainerStyled>
  );
};

export default Map;
