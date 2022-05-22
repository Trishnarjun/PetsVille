import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate();
  const [profiles, setProfile] = useState([]);
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

  const dataPreset =[];
  profiles.map(profile => {
    if (profile.user_id == sessionStorage.getItem("USER_ID")) {
      dataPreset.push(profile.pet_name)
      dataPreset.push(profile.species)
      dataPreset.push(profile.size)
      dataPreset.push(profile.breed)
      dataPreset.push(profile.age)
    }
  })

  return (
    <>
      {/* onSubmit={onSubmit} */}
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="sign-up-form">
        <form className="form-box" onSubmit={onSubmit}> 
          <section>
            <h3 className="header"> Edit Profile</h3>
            <input
              id="name"
              type="text"
              name="pet_name"
              placeholder="name"
              required={true}
              onChange={onChange}
              value={dataPreset[0]}
            />
            <br />
            <input
              type="text"
              name="species"
              placeholder="species"
              required={true}
              onChange={onChange}
              value={dataPreset[1]}

            />
            <br />
            <input
              type="text"
              name="size"
              placeholder="size"
              required={true}
              onChange={onChange}
              value={dataPreset[2]}
              
            />
            <br />
            <input
              type="text"
              name="breed"
              placeholder="breed"
              required={true}
              onChange={onChange}
              value={dataPreset[3]}
              
            />
            <br />
            <input
              id="age"
              type="number"
              name="age"
              placeholder="age"
              required={true}
              onChange={onChange}
              value={dataPreset[4]}
            />
            <br />
            <label for="uploads">Choose an image you want to upload:</label>
            <input
              type="file"
              name="picture"
              onChange={event => uploadimage(event.target.files)}
            />
          </section>

          <button className="sign-up-form-button">Update</button>
        </form>
      </div>
    </>

  )

}

export default Profile