import Nav from "../components/Nav"
import AuthModal from "../components/AuthModal"
import { useState } from 'react'

const Login = () => {
  const [showModal, setShowModal] = useState(false)
  const [isSignup, setIsSignup] = useState(true)


  const authToken = false

  const handleClick = () => {
    console.log('clicked')
    setShowModal(true)
    setIsSignup(true)
  }

  return (
    <div className="overlay">
    <Nav authToken={authToken}
     setShowModal={setShowModal}
      showModal={showModal}
      setIsSignup={setIsSignup}/>
    <div className="login">
      <h1 className="primary-title">All About Pets</h1>
      <button className="primary-button" onClick={handleClick}>
        {authToken ? 'Signout' : 'Create Account' }
    </button>  

    {/* basically saying if showModal is true then show the authmodal */}

    {showModal && (
      <AuthModal setShowModal={setShowModal}  isSignup={isSignup}/>
    )}

  </div>
  </div>
  )
}
export default Login