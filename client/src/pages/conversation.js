import Chat from '../components/chat';
import { useState } from 'react';
import io from 'socket.io-client'
import "../conversations.css";

const socket = io.connect("http://localhost:3002");

const Conversation = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== ""){
     socket.emit("join_room", room); 
     setShowChat(true);
    }
  }
 
console.log(req.session.id)

  return (
    <div className='conversation'>
      {!showChat ? (
      <div className='joinChatContainer'>
    <h3>Conversation</h3>
    <input
      type="text"
      placeholder="name"
      onChange={(event) => {
        setUsername(event.target.value);
      }}
    />
    <input
      type="text"
      placeholder="room"
      onChange={(event) => {
        setRoom(event.target.value);
      }}
    />
    <button onClick={joinRoom}>Join A room</button>
    </div>
    )
  : (
    <Chat socket={socket} username={username} room={room} />
  )}
    </div>
  )
}
export default Conversation;