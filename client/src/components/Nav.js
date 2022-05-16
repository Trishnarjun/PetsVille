import logo from '../Images/logo7.png'

const Nav = ({ minimal, authToken, setShowModal, showModal, setIsSignup}) => {

  const handleClick = () => {
    setShowModal(true)
    setIsSignup(false)
  }

  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={logo} alt="PetsVille logo"/>
      </div>
       
       {!authToken && !minimal &&<button
        className="nav-button"
        onClick={ handleClick }
        disabled={showModal}
        >Log in</button>} 
    </nav>
  )
}

// const Nav = ({ authToken }) => {
//   return (<nav> 
//       <div className="logo-container">
//          <img className="logo" src={logo} alt="PetsVille logo"/>
//        </div>
//        {!authToken && <button className="nav-button">Log in</button>} 
//      </nav>
//   )
// }

export default Nav


