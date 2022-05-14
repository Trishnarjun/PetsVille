import Nav from "../components/Nav"

const Login = () => {

  const authToken = false

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <>
    <Nav/>
    <div className="login">
      <h1> Pets-Ville </h1>
      <button className="primary-button" onClick={handleClick}>
        {authToken ? 'Signout' : 'Create Account' }
    </button>  

  </div>
  </>
  )
}
export default Login