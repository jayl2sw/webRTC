import React, { useEffect, useState } from 'react';
import GuildComponentBox from  './GuildComponentBox'
import io from "socket.io-client";
// import Peer from 'simple-peer'

const guildId = 3;
const nickname = "nickname";

const GuildPage = () => {
    const [bool, setBool] = useState(false);

    useEffect( () =>  {
      connectWithSocketIOServer();    
      setBool(joinGuildChannel(nickname, guildId));
      return () => {     
      }
    }, []);
    

    const [guildInfo, setGuildInfo] = useState({ guildId: guildId, rooms:[
        {
          roomNumber: 1,
          videoId: null,
          connectedUsers: [],
        },
        {
          roomNumber: 2,
          videoId: null,
          connectedUsers: [],
        },
        {
          roomNumber: 3,
          videoId: null,
          connectedUsers: [],
        },
      ], connectedUsers:[] })

    useEffect( () => {
        console.log("guildInfo changed:", guildInfo);
    }, [guildInfo])
    
    const connectWithSocketIOServer = () => {
      socket = io(SERVER);
    
      socket.on("connect", () => {
        console.log("successfully connected with socket io server");
        console.log(socket.id);
        // setSocketId(socket.id);
      });
    
      socket.on("guild-update", (data) => {
          setGuildInfo((prevState) => ({
              ...prevState, 
              guildId: data.guild.guildId,
              rooms: data.guild.rooms,
              connectedUsers: data.guild.connectedUsers,
          }));
      })
  }

  return (
      <div>
          {bool &&
          <GuildComponentBox guildInfo={guildInfo} />
          }
      </div>
  );



};

const SERVER = "http://localhost:5002";

let socket = null;

export const joinGuildChannel = (nickname, guildId) => {
  const data = {
      nickname,
      guildId
  }
  console.log("socket---------------------------11111111", socket)
  socket.emit("join-guild-channel", data)
  return true;
};
export const createRoom = (roomNumber, guildId, videoId, learningRecordId) => {
  // emit an event to server that we would like to create new room
  const data = {
      roomNumber,
      guildId,
      videoId,
      learningRecordId,
  };
  console.log("-------------------create room------------------", socket)
  socket.emit("create-room", data);
  
};
export const joinRoom = (roomNumber, guildId, learningRecordId) => {
  // emit an event to server that we would like to create new room
  const data = {
      roomNumber,
      guildId,
      learningRecordId,
  };
  console.log("-------------------join room------------------", socket)
  socket.emit("join-room", data);   
};
export const disconnect = () => {
  // emit an event to server that we would like to create new room
  console.log("-------------------disconnect---------------", socket)
  socket.emit("join-room");   
};
export const exitRoom = () =>{
  console.log("--------------------exit-room----------------", socket)
  socket.emit("exit-room");
}
export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {

}

export default GuildPage;