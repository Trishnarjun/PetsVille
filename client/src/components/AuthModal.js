import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AuthModal = ({ setShowModal, isSignup }) => {
  const [ email, setEmail] = useState(null)
  const [ password, setPassword] = useState(null)
  const [ confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(null)

  let navigate = useNavigate()

  console.log(email, password, confirmPassword)
  
  
  const handleClick = () => {
    setShowModal(false)
  }
 
  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      if( isSignup && ( password !== confirmPassword)) {
        setError('Passwords need to match!')
      return
    } 
    
    const response =  axios.post('http://localhost:3002/users/register', {email, password})

    const success = response.status === 201

    if (success) navigate('/register')

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="auth-modal">
      <div className="close-icon" onClick ={handleClick}>ⓧ</div>
      <h2>{isSignup ? 'CREATE ACCOUNT' : 'LOGIN'}</h2>
      <form onSubmit={handleSubmit}>

          <input 
            type="email"
            id="email"
            name="email"
            placeholder="email"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
        />
          <input 
            type="password"
            id="password"
            name="password"
            placeholder="password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
        />
          {isSignup && <input 
            type="password"
            id="password-check"
            name="password-check"
            placeholder="confirm password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
        />}
        <input className="secondary-button" type="submit"/>
        <p>{error}</p>
      </form>
      <hr/>
      <></>
     
    </div>
  )
}
export default AuthModal