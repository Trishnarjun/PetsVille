import { useState } from "react";
import Nav from '../components/Nav';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Register-Form.css";

const Register = () => {
   
  const navigate = useNavigate();
  const [data, setData] = useState({
    Name: "",
    species: "",
    size: "",
    breed: "",
    age: "",
    image: "",
  });
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    axios
      .post("http://localhost:3001/users/register", data)
      .then(function (response) {
        console.log(response);
        navigate.push("/Home");
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
        <label> Name </label>
        <input
          id="Name"
          type="text"
          name="name"
          placeholder="name"
          required={true}
          onChange={onChange}
          value={data.Name}
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
        <label for="uploads">Choose the images you want to upload:</label>
        <input
          type="file"
          id="uploads"
          name="image"
          accept=".jpg, .jpeg, .png, .gif"
          multiple
        />
      
          </section>
     
      {/* <div className="sign-up-form__field-wrapper">
        Species:
        <input
          type="text"
          name="species"
          placeholder="species"
          onChange={onChange}
          value={data.species}
        />
      </div>

      <div className="sign-up-form__field-wrapper">
        Size:
        <input
          type="text"
          name="size"
          placeholder="size"
          onChange={onChange}
          value={data.size}
        />
      </div>

      <div className="sign-up-form__field-wrapper">
        Breed(Optional):
        <input
          type="text"
          name="breed"
          placeholder="breed"
          onChange={onChange}
          value={data.breed}
        />
      </div>

      <div className="sign-up-form__field-wrapper">
        Age:
        <input
          type="text"
          name="age"
          placeholder="age"
          onChange={onChange}
          value={data.age}
        />
      </div>

      <div className="sign-up-form__field-wrapper">
        <label for="uploads">Choose the images you want to upload:</label>
        <input
          type="file"
          id="uploads"
          name="image"
          accept=".jpg, .jpeg, .png, .gif"
          multiple
        />
      </div> */}

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
