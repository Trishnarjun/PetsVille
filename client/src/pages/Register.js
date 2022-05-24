import { useState } from "react";
import Nav from "../components/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Register-Form.css";

const Register = () => {
  const navigate = useNavigate();
  const [mainSpecies, setMainSpecies] = useState("Dog");
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
    uploadimage();
  };
  const onChange = (event) => {
    console.log(`this is event`, event);

    setData((current) => {
      return { ...current, [event.target.name]: event.target.value };
    });
  };

  const uploadimage = (files) => {
    const formdata = new FormData();
    console.log(files[0]);
    formdata.append("file", files[0]);
    formdata.append("upload_preset", "vjuxaevv");
    axios
      .post(
        "https://api.cloudinary.com/v1_1/petsville-1/image/upload",
        formdata
      )
      .then((response) => {
        console.log(response.data.url);
        setData((prev) => {
          return { ...prev, picture: response.data.url };
        });
      });
  };

  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={false} />
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
            <select
              className="species"
              id="species"
              onChange={(e) => setData(e.target.value)}
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Hamster">Hamster</option>
              <option value="Snake">Snake</option>
            </select>
            <br />
            <select
              className="size"
              id="size"
              placeholder="size"
              onChange={(e) => setData(e.target.value)}
            >
              <option value="Large">Large</option>
              <option value="Medium">Medium</option>
              <option value="Small">Small</option>
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
              min="0"
              max="15"
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
              onChange={(event) => uploadimage(event.target.files)}
            />
          </section>

          <button className="sign-up-form-button">Sign Up</button>
        </form>
      </div>
    </>
  );
};
export default Register;
