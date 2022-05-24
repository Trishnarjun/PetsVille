import { useState } from "react";
import Nav2 from "../components/Nav2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Register-Form.css";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    pet_name: "",
    species: "",
    size: "",
    breed: "",
    age: "",
    picture: "",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    console.log("is it changing");
    const dataToSend = { ...data, user_id: sessionStorage.getItem("USER_ID") };
    axios
      .post("http://localhost:3002/profiles", dataToSend)
      .then(function (response) {
        console.log(response);
        navigate("/Home");
      })
      .catch(function (error) {
        console.log(error);
      });
    uploadimage()
  };
  const onChange = (event) => {
    console.log(`this is event`, event);
    
    
    
    setData((current) => {
      return { ...current, [event.target.name]: event.target.value };
    });
  };

  const uploadimage = (files) => {
    const formdata = new FormData();
    console.log(files[0])
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

  return (
    <>
      <Nav2 minimal={true} setShowModal={() => {}} showModal={false} />
      <div className="sign-up-form">
        <form className="form-box" onSubmit={onSubmit}>
          <section>
            <h3 className="header"> Create Account</h3>
            <input
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
            <label for="uploads">Choose the images you want to upload:</label>
            <input
              type="file"
              name="picture"
              onChange={event => uploadimage(event.target.files)}
            />
          </section>

          <button className="sign-up-form-button">Sign Up</button>
        </form>
        </div>
    </>
  );
};
export default Register;
