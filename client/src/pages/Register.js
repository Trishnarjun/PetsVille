import { useState } from "react";
import Nav from "../components/Nav";
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
              onChange={onChange}
              value={data.species}
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
              onChange={onChange}
              value={data.size}
            >
              <option value="ExtraLarge">XL</option>
              <option value="Large">L</option>
              <option value="Medium">M</option>
              <option value="Small">S</option>
              <option value="ExtraSmall">XS</option>
            </select>
            <br />
            <select
              className="breed"
              id="breed"
              placeholder="breed"
              onChange={onChange}
              value={data.breed}
            >
              <option value="Bulldog">Bulldog</option>
              <option value="Labrador Retriever">Labrador Retriever</option>
              <option value="German Shepard">German Shepard</option>
              <option value="Poodle">Poodle</option>
              <option value="Chihuahua">Chihuahua</option>
              <option value="French Bulldog">French Bulldog</option>
              <option value="Border Collie">Border Collie</option>
            </select>
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
