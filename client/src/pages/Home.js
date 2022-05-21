import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from '../components/Nav';
import "../home.css";
import React, { useEffect, useState }  from 'react';

const Home = () => {
  const [profiles, setProfile] = useState([])
  // for filtering by distace //
  //const [distanceIndex, setDistanceIndex] = useState([]) 
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const fetchProfilesResponse = async () => {
      try {
        const axiosRes = await axios.get('http://localhost:3002/profiles')
        setProfile(axiosRes.data);
      } catch (error) {
        console.log("error: ",error);
      } 

    } 
    fetchProfilesResponse();
  }, []);

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/conversation`; 
    navigate(path);
  }


  const profileDistances = []
  const userLocations = []
  profiles.map((user) => {
    if (user.user_id == sessionStorage.getItem('USER_ID')) {
      userLocations.push(user.lat)
      userLocations.push(user.lng)
    }
  })

  const profilesDisplay = () => profiles.map((profile) => {
    
    const toRad = (d) => {
      return d * Math.PI / 180;
    };

    console.log("the userlocations:",Number(userLocations[0]), Number(userLocations[1]))
    
    const profileDistance = () => {
      const R = 6371;
      const dLat = toRad(parseFloat(profile.lat) - Number(userLocations[0]));
      const dLng = toRad(parseFloat(profile.lng) - (Number(userLocations[1])));
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(Number(userLocations[0]))) * Math.cos(toRad(profile.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d; // distance in KM
    };
    profileDistances.push(profileDistance())
    console.log(sessionStorage.getItem('USER_ID'), profile.user_id)
    return (
      <>
      <button
        onMouseEnter={() => setIsShown(profile.id)}
        onMouseLeave={() => setIsShown(false)}
      >
          
        {(isShown != profile.id && profile.user_id != sessionStorage.getItem('USER_ID'))  && (

          
          
        <div className='profile-box'> 
          <div><img src={profile.picture} alt="owners dog pic" width="200px" /></div>
          <div>{profile.pet_name}</div>
          <div>{Math.round(profileDistance() * 10) / 10} Km</div>
        </div>
        )}
      {(isShown == profile.id && profile.user_id != sessionStorage.getItem('USER_ID'))  && (
        <>
        <div className='profile-box'> 
          <div>Size: {profile.size}</div>
          <div>Breed: {profile.breed}</div>
          <div>Kind: {profile.species}</div>
          <div>Age: {profile.age}</div>
          <button onClick={routeChange}>Chat</button>
        </div>
        <div>
        </div>
        </>
      )}
      </button>
      </>
    )
  })

  // console.log(profileDistances);
  return (
      <>
      <Nav
        minimal={true}
        setShowModal={() => {}}
        showModal={false}
      />
      <body>
        <div className='profiles'> 
          {profilesDisplay()}
        </div>
      </body>
      </>

      

  )
}
export default Home