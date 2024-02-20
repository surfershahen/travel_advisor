import React from "react";

import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@mui/material";

import { LocationOnOutlined } from "@mui/icons-material";
import { Phone } from "@mui/icons-material";
import { Rating } from "@mui/material";
import styled from "styled-components";

const Subtitle1 = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
const ChipStyled = styled(Chip)`
  margin: 5px 5px 5px 0;
`;
const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://www.google.com/imgres?imgurl=https%3A%2F%2Ft3.ftcdn.net%2Fjpg%2F05%2F88%2F37%2F02%2F360_F_588370263_HxquwnQk1VkQjK1hJ6lZlnSDAEmNOwoS.jpg&tbnid=apFTk2iNEnZC-M&vet=12ahUKEwiE9Oe2h-iDAxVH6bsIHYFRBSUQMygJegQIARBZ..i&imgrefurl=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Dlaw%2Bof%2Battraction&docid=gLGQjRSiNHQx6M&w=540&h=360&q=attraction%20images&ved=2ahUKEwiE9Oe2h-iDAxVH6bsIHYFRBSUQMygJegQIARBZ"
        }
        title={place.name}
      />

      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} readOnly />
          <Subtitle1 variant="subtitle1" gutterBottom>
            {place.num_reviews} reviews
          </Subtitle1>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Subtitle1 color="textSecondary" variant="h6">
            Price
          </Subtitle1>
          <Subtitle1 color="textSecondary" gutterBottom variant="h6">
            {place.price_level}
          </Subtitle1>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Subtitle1 color="textSecondary" variant="h6">
            Ranking
          </Subtitle1>
          <Subtitle1 color="textSecondary" gutterBottom variant="h6">
            {place.ranking}
          </Subtitle1>
        </Box>

        {place?.cuisine?.map(({ name }) => (
          <ChipStyled key={name} size="small" label={name} />
        ))}

        {place?.address && (
          <Typography gutterBottom variant="body2" color="textSecondary">
            <LocationOnOutlined /> {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography gutterBottom variant="subtitle2" color="textSecondary">
            <Phone /> {place.phone}
          </Typography>
        )}

        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.web_url, "_blank")}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.website, "_blank")}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
