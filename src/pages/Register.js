import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
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
    <form id="sign-up-form" className="sign-up-form" onSubmit={onSubmit}>
      <div className="sign-up-form__field-wrapper">
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
      </div>

      <div className="sign-up-form__field-wrapper">
        <button>Sign Up</button>
      </div>
    </form>
  );
};
export default Register;

//<a id="sign-up-form__cancel" href="#">
//Cancel
//</a>
