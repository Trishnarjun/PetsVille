import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import "../home.css";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [profiles, setProfile] = useState([]);
  // for filtering by distace //
  //const [distanceIndex, setDistanceIndex] = useState([])
  const [isShown, setIsShown] = useState(false);

  
  useEffect(() => {
    const fetchProfilesResponse = async () => {
      try {
        const axiosRes = await axios.get(
          "http://localhost:3002/profiles?searchType=location"
        );
        axiosRes.data.sort((a, b) => a.distance - b.distance);
        setProfile(axiosRes.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchProfilesResponse();
  }, []);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/conversation`;
    navigate(path);
  };

  const names =[];
  profiles.map(profile => {
    if (profile.user_id == sessionStorage.getItem("USER_ID")) {
      names.push(profile.pet_name)
    }
  })


  const profilesDisplay = () => 
    profiles.map((profile) => {
      // const toRad = (d) => {
      //   return (d * Math.PI) / 180;
      // };

      // const profileDistance = () => {
      //   const R = 6371;
      //   const dLat = toRad(parseFloat(profile.lat) - userLocations[0]);
      //   const dLng = toRad(parseFloat(profile.lng) - userLocations[1]);
      //   const a =
      //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      //     Math.cos(toRad(userLocations[0])) *
      //       Math.cos(toRad(profile.lat)) *
      //       Math.sin(dLng / 2) *
      //       Math.sin(dLng / 2);
      //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      //   var d = R * c;
      //   return d; // distance in KM
      // };
      // profileDistances.push(profileDistance());
      console.log(sessionStorage.getItem("USER_ID"), profile.user_id);
      return (
        <>
          {profile.user_id != sessionStorage.getItem("USER_ID") && (
          <button
            onMouseEnter={() => setIsShown(profile.id)}
            onMouseLeave={() => setIsShown(false)}
          >
            {isShown != profile.id &&
              profile.user_id != sessionStorage.getItem("USER_ID") && (
                <div className="profile-box">
                  <div>
                    <img
                      src={profile.picture}
                      alt="owners dog pic"
                      width="200px"
                    />
                  </div>
                  <div>{profile.pet_name}</div>
                  <div>{Math.round(profile.distance * 10) / 10} Km</div>
                </div>
              )}
            {isShown == profile.id &&
              profile.user_id != sessionStorage.getItem("USER_ID") && (
                <>
                  <div className="profile-box">
                    <div>Size: {profile.size}</div>
                    <div>Breed: {profile.breed}</div>
                    <div>Kind: {profile.species}</div>
                    <div>Age: {profile.age}</div>
                    <button onClick={routeChange}>Chat</button>
                  </div>
                  <div></div>
                </>
              )}
          </button>)
          }
        </>
      );
    });

    
  // console.log(profileDistances);
  console.log(names[0])
  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} name={names[0]} />
      <body>
        <div className="profiles">{profilesDisplay()}</div>
      </body>
    </>
  );
};
export default Home;
