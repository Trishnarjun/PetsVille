import Nav from "../components/Nav"
import AuthModal from "../components/AuthModal"
import { useState } from 'react'
import {useCookies} from "react-cookie"

const Login = () => {
  const [showModal, setShowModal] = useState(false)
  const [isSignup, setIsSignup] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const authToken = cookies.AuthToken


  
  const handleClick = () => {
    if (authToken) {
      removeCookie('UserId', cookies.UserId)
      removeCookie('AuthToken', cookies.AuthToken)
      
      return
  }
    console.log('clicked')
    setShowModal(true)
    setIsSignup(true)
  }

  return (
    <div className="overlay">
    <Nav authToken={authToken}
     setShowModal={setShowModal}
      showModal={showModal}
      setIsSignup={setIsSignup}
      />
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