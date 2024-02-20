import axios from "axios";

// try {
//   const response = await axios.request(options);
//   console.log(response.data);
// } catch (error) {
//   console.log(error);
// }

export const getPlacesData = async (type, sw, ne) => {
  try {
    //request
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          bl_latitude: sw.lat,
          currency: "USD",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key":
            "29562a4363msh48c965a511f1e9fp1b402fjsn3d49ac07403a",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export const getWeatherData = async (lat, lng) => {
//   try {
//     const { data } = await axios.get(
//       "https://community-open-weather-map.p.rapidapi.com/find",
//       {
//         params: {
//           lon: lng,
//           lat: lat,
//         },
//         headers: {
//           "X-RapidAPI-Key":
//             "7ac27a029fmshc784f8b682bb364p1499dajsnaf7cc4f256df",
//           "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
//         },
//       }
//     );
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
