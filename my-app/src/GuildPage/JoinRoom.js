import React, { useState } from 'react';
import { createRoom, joinRoom, exitRoom } from './GuildPage';
import styled from 'styled-components' 

const JoinRoom = ({ roomInfo, guildId, onClickModal, onClickRoomModal }) => {
    const [videoId, setVideoId] = useState("")
    const [learningRecordId, setLearningRecordId] = useState("")
    return (
        <div>
            <div>
                {roomInfo.videoId == null && 
                    <div>
                        <p>VideoId</p>
                        <input onChange={(e) => setVideoId(e.target.value)}/>
                    </div>
                }
                <p>learningRecordId</p>
                <input onChange={(e) => setLearningRecordId(e.target.value)}/>
            </div>
            <button onClick ={() => {
                JoinRoomhandler(roomInfo, roomInfo.roomNumber, guildId, videoId, learningRecordId)
                onClickModal()
                onClickRoomModal()
            }}
                >
                입장하기    
            </button>
            <button onClick={() => {
                exitRoom() 
                onClickModal()
            }}>나가기</button>
        </div>
    );
};

const JoinRoomhandler = (roomInfo, roomNumber, guildId, videoId, learningRecordId) => {
    if (roomInfo) {
        if (roomInfo.connectedUsers.length === 0) {
            createRoom(roomNumber, guildId, videoId, learningRecordId)
        } else {
            joinRoom(roomNumber, guildId, learningRecordId) }
    } else {
        createRoom(roomNumber, guildId, videoId, learningRecordId)
    }
}  

const RoomContainer = styled.div`
  width: 45vw;
  height: 55vh;
  padding: 1vh 1vw;
  background: #ffffff;
  display: flex;
  color: black;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1vmin;
  border: none;
  border-radius: 2vmin;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  z-index: 10000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default JoinRoom;