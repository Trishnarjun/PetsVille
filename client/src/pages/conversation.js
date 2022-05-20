import Chat from '../components/chat';
import { useState, useEffect } from 'react';
import io from 'socket.io-client'
import "../conversations.css";
import axios from 'axios';

const socket = io.connect("http://localhost:3002");

const Conversation = () => {
  //const [username, setUsername] = useState("");
  //const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [profiles, setProfile] = useState([])

  const room = 1; 
  useEffect(() => {
    const fetchProfilesResponse = async () => {
      try {
        const axiosRes = await axios.get('http://localhost:3002/profiles')
        setProfile(axiosRes.data);
      } catch (error) {
        console.log("error: ",error);
      } 

    } 
    fetchProfilesResponse();
  }, []);

  // setUsername()
  sessionStorage.getItem('USER_ID')
  console.log(sessionStorage.getItem('USER_ID'))
  let usernames = []
  profiles.map((profile) => {
    console.log("map:",profile)
    console.log("conversations:",sessionStorage.getItem('USER_ID'))
    if (profile.user_id == sessionStorage.getItem('USER_ID')) {
      usernames.push(profile.pet_name)
    }

  })
  
  console.log(profiles)

  const joinRoom = () => {
    if (usernames[0] !== "" && room !== ""){
     socket.emit("join_room", room); 
     setShowChat(true);
    }
  }

  console.log(usernames)

  return (
    <div className='conversation'>
      {!showChat ? (
      <div className='joinChatContainer'>
    <h3>Conversation</h3>
    {/* <input
      type="text"
      placeholder="name"
      onChange={(event) => {
        setUsername(event.target.value);
      }}
    /> */}
    {/* <input
      type="text"
      placeholder="room"
      onChange={(event) => {
        setRoom(event.target.value);
      }}
    /> */}
    <button onClick={joinRoom}>Start Chat!</button>
    </div>
    )
  : (
    <Chat socket={socket} username={usernames[0]} room={room} />
  )}
    </div>
  )
}
export default Conversation;