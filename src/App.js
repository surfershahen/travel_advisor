import React, { useState, useEffect } from "react";
// Component Imports
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
// Styles Import
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid"; // Grid version 1
// Apis Import
import { getPlacesData } from "./api";
const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  // const [weatherData, setWeatherData] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      },
      err => {
        console.error("Error getting location:", err);
        // Set default coordinates if geolocation fails
        setCoordinates({ lat: 0, lng: 0 });
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter(
      place => Number(place.rating) > rating
    );

    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      // getWeatherData(coordinates.lat, coordinates.lng).then(data => {
      //   setWeatherData(data);
      // });
      getPlacesData(type, bounds.sw, bounds.ne).then(data => {
        setPlaces(data?.filter(place => place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [type, bounds]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        {/* Grid for full width on mobile & medium devices */}
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces?.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            // weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
