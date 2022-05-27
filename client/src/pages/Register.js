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
    
    const dataToSend = { ...data, user_id: sessionStorage.getItem("USER_ID") };
    axios
      .post("http://localhost:3002/profiles", dataToSend)
      .then(function (response) {
        uploadimage();
      })
      .catch(function (error) {
        console.log(error);
      });
      navigate("/Home");
    
  };
  
  

  const onChange = (event) => {
    setData((current) => {
      return { ...current, [event.target.name]: event.target.value };
    });
  };

  const uploadimage = (files) => {
    const formdata = new FormData();
    console.log(formdata);
    console.log(files)
    formdata.append("file", files[0]);
    formdata.append("upload_preset", "vjuxaevv");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/petsville-1/image/upload",
        formdata
      )
      .then( (response) => {
        console.log(response)
        // const sleep = ms => new Promise(r => setTimeout(r, ms));
        
        let ImageURL = response.data.secure_url
        
        console.log(ImageURL)

        setData((prev) => {
          return { ...prev, picture: ImageURL };
        });
        
      
      });

      
      

  };

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
            <select className="species" name="species" onChange={onChange} value={data.value}>
              <option value="" default hidden>Species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Hamster">Hamster</option>
              <option value="Snake">Snake</option>
            </select>
            <br />
            <select className="size" name="size" onChange={onChange} value={data.value}>
              <option value="" default hidden>Size</option>
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
          </section>

          <button className="sign-up-form-button" onSubmit={onSubmit}>Sign Up</button>
        </form>
        </div>
    </>
  );
};
export default Register;
