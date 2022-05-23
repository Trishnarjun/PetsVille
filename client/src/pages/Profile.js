import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [edit, setEdit] = useState(false)
  // const [user, setUser] = useState()

  useEffect(() => {
    const fetchProfilesResponse = async () => {
      try {
        const axiosRes = await axios.get(
          "http://localhost:3002/profiles?searchType=location"
        );
        axiosRes.data.sort((a, b) => a.distance - b.distance);
        setProfiles(axiosRes.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchProfilesResponse();
  }, []);

  const userObj = [];
  profiles.forEach(user => {
    //console.log(user)
    if (user.user_id == sessionStorage.getItem("USER_ID")) {
      console.log("entered:",user)
      userObj.push(user.picture)
      userObj.push(user.pet_name)
      userObj.push(user.species)
      userObj.push(user.size)
      userObj.push(user.breed)
      userObj.push(user.age)

      console.log(user.pet_name)
    }
  })
  console.log("mapeed:",userObj[0])
  // console.log("mapeed not working:",userObj[0]['pet_name'])

  const [data, setData] = useState({
    pet_name: "",
    species: "",
    size: "",
    breed: "",
    age: "",
    picture: "",
  });


  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const dataToSend = { ...data,  user_id: sessionStorage.getItem("USER_ID") };
      axios.post("http://localhost:3002/profiles/update", dataToSend)
      uploadimage()
    } catch (error) {
      console.log(error);
    }
    await navigate("/Home");
  };


  const onChange = (event) => {
    console.log(`this is event`, event);
    
    setData((current) => {
      return { ...current, [event.target.name]: event.target.value };
    });
  };

  const onEdit =(e) => {
    e.preventDefault();
    console.log("working")
    if (edit) {
      setEdit(false)
    } else {
      setEdit(true)
    }
    setData({
      pet_name: userObj[1],
      species: userObj[2],
      size: userObj[3],
      breed: userObj[4],
      age: userObj[5],
      picture: userObj[0],
    })
  }

  const uploadimage = (files) => {
    const formdata = new FormData();
    formdata.append("file", files[0])
    formdata.append("upload_preset", "vjuxaevv")
    axios
      .post("https://api.cloudinary.com/v1_1/petsville-1/image/upload", formdata).then((response) => {
        
      console.log(response.data.url)
      setData((prev) => {
        return {...prev, picture: response.data.url}
      })
    
    })
  }



  

  console.log(data)

  

  

  return (
    <>
      {/* onSubmit={onSubmit} */}
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="sign-up-form">
        <form className="form-box" onSubmit={onSubmit} > 
          <section>
            <h3 className="header">{edit ? "Edit Profile" : "Profile"}</h3>

            {!edit && (
              <>
              <div>
                <img
                  src={userObj[0]}
                  alt="owners dog pic"
                  width="100px"
                  height="100px"
                />
              </div>
              <div>Name: {userObj[1]} </div>
              <div>Species: {userObj[2]} </div>
              <div>Size: {userObj[3]} </div>
              <div>Breed: {userObj[4]} </div>
              <div>Size: {userObj[5]} </div>
              <button type="button" className="btn btn-outline-info" onClick={onEdit}>Edit</button>
              </>
            )}


            {edit && (
            <><input
              id="name"
              type="text"
              name="pet_name"
              placeholder="name"
              required={true}
              onChange={onChange}
              value={data.pet_name}
            />
            <br />
            <input
              type="text"
              name="species"
              placeholder="species"
              required={true}
              onChange={onChange}
              value={data.species}
            />
            <br />
            <input
              type="text"
              name="size"
              placeholder="size"
              required={true}
              onChange={onChange}
              value={data.size}
            />
            <br />
            <input
              type="text"
              name="breed"
              placeholder="breed"
              required={true}
              onChange={onChange}
              value={data.breed}
              
            />
            <br />
            <input
              id="age"
              type="number"
              name="age"
              placeholder="age"
              required={true}
              onChange={onChange}
              value={data.age}
              
            />
            <br />
            <label for="uploads">Choose an image you want to upload:</label>
            <input
              type="file"
              name="picture"
              onChange={event => uploadimage(event.target.files)}
            />
            <button className="sign-up-form-button" onSubmit={onSubmit}>Update</button>
            <button type="button" className="btn btn-outline-info" onClick={onEdit}>Cancel</button>
            </>)}
          </section>

          
          
        </form>
      </div>
    </>

  )

}

export default Profile