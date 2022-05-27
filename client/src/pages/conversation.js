import Chat from "../components/chat";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import "../conversations.css";
import axios from "axios";
import Nav3 from "../components/Nav3";


const socket = io.connect("http://localhost:3002");

const Conversation = () => {
  const [showChat, setShowChat] = useState(false);
  const [profiles, setProfile] = useState([]);

  const room = 1;
  useEffect(() => {
    const fetchProfilesResponse = async () => {
      try {
        const axiosRes = await axios.get(
          "http://localhost:3002/profiles?searchType=location"
        );
        setProfile(axiosRes.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchProfilesResponse();
  }, []);

  
  sessionStorage.getItem("USER_ID");
  let usernames = [];
  profiles.map((profile) => {
    if (profile.user_id == sessionStorage.getItem("USER_ID")) {
      usernames.push(profile.pet_name);
    }
  });

  const names =[];
  profiles.map(profile => {
    if (profile.user_id == sessionStorage.getItem("USER_ID")) {
      names.push(profile.pet_name)
    }
  })

  const joinRoom = () => {
    if (usernames[0] !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };


  return (
    <>
    <Nav3 minimal={true} setShowModal={() => {}} showModal={false} name={names[0]} />
    <div className="conversation">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Conversation</h3>
          <button onClick={joinRoom}>Start Chat!</button>
        </div>
      ) : (
        <Chat socket={socket} username={usernames[0]} room={room} />
      )}
    </div>
    </>
  );
};
export default Conversation;
