import React, { useState } from 'react';
import { createRoom, joinRoom } from './GuildPage'; 

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
                onClickModal()
                onClickRoomModal()
                JoinRoomhandler(roomInfo, roomInfo.roomNumber, guildId, videoId, learningRecordId)
            }}
                >
                입장하기    
            </button>
            <button onClick={() => {
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

export default JoinRoom;