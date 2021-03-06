import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Profile.css"; 

const Profile = () => {

  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [edit, setEdit] = useState(false)

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
    if (user.user_id == sessionStorage.getItem("USER_ID")) {
      userObj.push(user.picture)
      userObj.push(user.pet_name)
      userObj.push(user.species)
      userObj.push(user.size)
      userObj.push(user.breed)
      userObj.push(user.age)
    }
  })

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
    setData((current) => {
      return { ...current, [event.target.name]: event.target.value };
    });
  };

  const onEdit =(e) => {
    e.preventDefault();
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
      setData((prev) => {
        return {...prev, picture: response.data.url}
      })
    
    })
  }

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="edit-form">
        <form className="form-box" onSubmit={onSubmit} > 
          <section>
            <h3 className="header">{edit ? "Edit Profile" : "Profile"}</h3>

            {!edit && (
              <>
              <div className="profile-display">
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
                <button type="button" className="edit-button" onClick={onEdit}>Edit</button>
              </div>
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
            <select className="species" name="species" onChange={onChange} value={data.value}>
            <option value={userObj[2]} default hidden>{userObj[2]}</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Hamster">Hamster</option>
              <option value="Snake">Snake</option>
            </select>
            <br />
            <select className="size" name="Size" onChange={onChange} value={data.value}>
            <option value={userObj[3]} default hidden>{userObj[3]}</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
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
            <div className="buttons">
              <button className="update-button" onSubmit={onSubmit}>Update</button>
              <button type="button" className="cancel-button" onClick={onEdit}>Cancel</button>
            </div>
            </>)}
          </section>

          
          
        </form>
      </div>
    </>

  )

}

export default Profile