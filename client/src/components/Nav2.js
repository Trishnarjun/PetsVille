
import logo from '../Images/logo7.png'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Nav = ({ minimal, authToken, setShowModal, showModal, setIsSignup}, props) => {
  const navigate = useNavigate();
  const [profiles, setProfile] = useState([]);

  const handleClick = () => {
    setShowModal(true)
    setIsSignup(false)
  }

  const navClick = () => {
    document.getElementsByClassName("header").length === 0  ? navigate("/Profile") : navigate("/Home")
  }

  const signOut = () => {
    sessionStorage.clear();
    navigate("/")
  }

  
  

  useEffect(() => {
    const fetchProfilesResponse = async () => {
      try {
        const axiosRes = await axios.get(
          "http://localhost:3002/profiles?searchType=location"
        );
        setProfile(axiosRes.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchProfilesResponse();
  }, []);

  const names =[];
  profiles.map(profile => {
    if (profile.user_id == sessionStorage.getItem("USER_ID")) {
      names.push(profile.pet_name)
      names.push(profile.picture)
    }
  })

  console.log(document.getElementsByClassName("header"))
  
  console.log(sessionStorage.getItem("USER_ID"))


  console.log(props.name)

  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={logo} alt="PetsVille logo"/>
      </div>

      <div className= "allNav">

      {sessionStorage.getItem("USER_ID")  &&<button
        className="nav-button-signout"
        onClick={ signOut }
        disabled={showModal}
        >Sign out</button>
      }
        </div>

    </nav>
  )
}

// const Nav = ({ authToken }) => {
//   return (<nav> 
//       <div className="logo-container">
//          <img className="logo" src={logo} alt="PetsVille logo"/>
//        </div>
//        {!authToken && <button className="nav-button">Log in</button>} 
//      </nav>
//   )
// }

export default Nav


