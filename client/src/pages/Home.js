import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import "../home.css";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [profiles, setProfile] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [mainOption, setMainOption] = useState("location");
  const [mainSpecies, setMainSpecies] = useState("Dog");
  const [mainAge, setMainAge] = useState("1");
  const [lng, setlng] = useState(null);
  const [lat, setlat] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setlat(position.coords.latitude);
      setlng(position.coords.longitude);
    });
  }, []);
  useEffect(() => {
    const fetchProfilesResponse = async () => {
      let url = `http://localhost:3002/profiles?searchType=${mainOption}`;
      url += `&lng=${lng}`;
      url += `&lat=${lat}`;
      if (mainOption === "species") {
        url += `&species=${mainSpecies}`;
      }
      if (mainOption === "age") {
        url += `&age=${mainAge}`;
      }
      try {
        const axiosRes = await axios.get(url);
        axiosRes.data.sort((a, b) => a.distance - b.distance);
        setProfile(axiosRes.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchProfilesResponse();
  }, [mainOption, mainSpecies, mainAge, lng, lat]);


  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/conversation`;
    navigate(path);
  };

  const names = [];
  profiles.map((profile) => {
    if (profile.user_id == sessionStorage.getItem("USER_ID")) {
      names.push(profile.pet_name);
    }
  });

  const profilesDisplay = () =>
    profiles.map((profile) => {
      if (profile.user_id != sessionStorage.getItem("USER_ID")) {
        return (
          <div
            onMouseEnter={() => setIsShown(profile.id)}
            onMouseLeave={() => setIsShown(false)}
          >
            {isShown !== profile.id &&
              profile.user_id !== sessionStorage.getItem("USER_ID") && (
                <div className="profile-box">
                  <div>
                    <img
                      src={profile.picture}
                      alt="owners dog pic"
                      width="200px"
                      height="200px"
                    />
                  </div>

                  <div>{profile.pet_name}</div>
                  <div>{(Math.round((profile.distance) * 10) / 10)} Km</div>
                </div>
              )}
            {isShown == profile.id &&
              profile.user_id != sessionStorage.getItem("USER_ID") && (
                <div className="profile-box">
                  <div>Size: {profile.size}</div>
                  <div>Breed: {profile.breed}</div>
                  <div>Kind: {profile.species}</div>
                  <div>Age: {profile.age}</div>
                  <button className="chat-button" onClick={routeChange}>
                    Chat
                  </button>
                </div>
              )}
          </div>
        );
      }
    });
  return (
    <>
      <Nav
        minimal={true}
        setShowModal={() => {}}
        showModal={false}
        name={names[0]}
      />
      <body>
        <div className="search">
          <form className="search-form" action="/Home" method="GET"></form>
          <label for="searchType">Search By:</label>
          <select
            className="searchType"
            id="searchType"
            onChange={(e) => setMainOption(e.target.value)}
          >
            <option value="location">By Location</option>
            <option value="species">By Species</option>
            <option value="age">By Age</option>
          </select>
          {mainOption === "species" && (
            <select
              className="searchType"
              id="searchSpeciesType"
              onChange={(e) => setMainSpecies(e.target.value)}
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </select>
          )}
          {mainOption === "age" && (
            <select
              className="searchType"
              id="searchAgeType"
              onChange={(e) => setMainAge(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
            </select>
          )}
        </div>
        <div className="profiles">{profilesDisplay()}</div>
      </body>
    </>
  );
};
export default Home;

