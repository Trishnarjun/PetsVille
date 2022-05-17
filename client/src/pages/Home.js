import axios from 'axios';
import Nav from '../components/Nav';
import "../home.css";
import React, { useEffect, useState }  from 'react';
const Home = () => {
  const [profiles, setProfile] = useState([])

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const axiosRes = await axios.get('http://localhost:3002/profiles')
        setProfile(axiosRes.data);
      } catch (error) {
        console.log("error: ",error);
      } 

    } 

    fetchResponse();
  }, []);


  return (
      <>
      <Nav
        minimal={true}
        setShowModal={() => {}}
        showModal={false}
      />
      <body>
        <div className='profiles'> 
          {profiles.map((profile) => {
            return (
              <>
              <div className='profile-box'> 
                <div>{profile.pet_name}</div>
                <div>{profile.picture}</div>
                <div>{profile.age}</div>
                <div>{profile.species}</div>
                <div>[DISTANCE]</div>
              </div>
              </>
            )
          })}
        </div>
      </body>
      </>

      

  )
}
export default Home