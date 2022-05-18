import { useState } from "react";
import Nav from '../components/Nav';
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
    image: "",
  });

 
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    console.log("is it changing")
    axios
      .post("http://localhost:3002/profiles", data)
      .then(function (response) {
        console.log(response);
        navigate("/Home");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onChange = (event) => {
    console.log(`this is event`, event);
    setData((current) => {
      return { ...current, [event.target.name]: event.target.value };
    });
  };

  return (

    <>
      <Nav
        minimal={true}
        setShowModal={() => {}}
        showModal={false}
      />
    
      <div className="sign-up-form">

      <form className="form-box" onSubmit={onSubmit}>
      <section>
        Name: 
        <input
          id="name"
          type="text"
          name="pet_name"
          placeholder="name"
          required={true}
          onChange={onChange}
          value={data.pet_name}
        /><br/>
        Species:
        <input
          type="text"
          name="species"
          placeholder="species"
          required={true}
          onChange={onChange}
          value={data.species}
          /><br/>
          Size:
        <input
          type="text"
          name="size"
          placeholder="size"
          required={true}
          onChange={onChange}
          value={data.size}
        /><br/>
        Breed:
        <input
          type="text"
          name="breed"
          placeholder="breed"
          required={true}
          onChange={onChange}
          value={data.breed}
        /><br/>
        Age:
        <input
          id="age"
          type="number"
          name="age"
          placeholder="age"
          required={true}
          onChange={onChange}
          value={data.age}
        /><br/>
        <label htmlFor="uploads">Choose the images you want to upload:</label>
        <input
          type="file"
          id="uploads"
          name="image"
          accept=".jpg, .jpeg, .png, .gif"
          multiple
        />
      
          </section>
     
          <button className="sign-up-form-button">Sign Up</button>
      
      </form>
    </div>
    </>
  );
};
export default Register;

//<a id="sign-up-form__cancel" href="#">
//Cancel
//</a>
