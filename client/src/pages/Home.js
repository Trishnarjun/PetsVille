import axios from "axios";
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
          "http://localhost:3002/profiles?searchType=location&lng=0.0&lat=0.0"
        );
        axiosRes.data.sort((a, b) => a.distance - b.distance);
        setProfile(axiosRes.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchProfilesResponse();
  }, []);

  const profileDistances = [];

  const profilesDisplay = () =>
    profiles.map((profile) => {
      const toRad = (d) => {
        return (d * Math.PI) / 180;
      };

      const profileDistance = () => {
        const R = 6371;
        const dLat = toRad(parseFloat(profile.lat) - 43.69702911376953);
        const dLng = toRad(parseFloat(profile.lng) - -79.65017700195312);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(43.69702911376953)) *
            Math.cos(toRad(profile.lat)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; // distance in KM
      };
      profileDistances.push(profileDistance());

      return (
        <>
          <button
            onMouseEnter={() => setIsShown(profile.id)}
            onMouseLeave={() => setIsShown(false)}
          >
            {isShown !== profile.id && (
              <div className="profile-box">
                <div>
                  <img
                    src={profile.picture}
                    alt="owners dog pic"
                    width="200px"
                  />
                </div>
                <div>{profile.pet_name}</div>
                <div>{Math.round(profileDistance() * 10) / 10} Km</div>
              </div>
            )}
            {isShown === profile.id && (
              <>
                <div className="profile-box">
                  <div>Size: {profile.size}</div>
                  <div>Breed: {profile.breed}</div>
                  <div>Kind: {profile.species}</div>
                  <div>Age: {profile.age}</div>
                  <button>Chat</button>
                </div>
                <div></div>
              </>
            )}
          </button>
        </>
      );
    });

  console.log(profileDistances);
  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <body>
        <div className="profiles">{profilesDisplay()}</div>
      </body>
    </>
  );
};
export default Home;
