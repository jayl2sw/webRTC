import React, { useState } from 'react';
import { createRoom, joinRoom } from './GuildPage'; 
import { getLocalPreviewAndInitRoomConnection } from './GuildPage';

const JoinRoom = ({ localStream, roomInfo, guildId, onClickModal, onClickRoomModal }) => {
    console.log(localStream)
    const [videoId, setVideoId] = useState("")
    const [learningRecordId, setLearningRecordId] = useState("")
    const Join = async (roomInfo, roomNumber, guildId, videoId, learningRecordId) => {
        // const testStream = getLocalPreviewAndInitRoomConnection() ;
        setTimeout(() => {
            getLocalPreviewAndInitRoomConnection()
        }, 0);
        setTimeout(3000);
        console.log(localStream);
        JoinRoomhandler(roomInfo, roomNumber, guildId, videoId, learningRecordId)         
    }
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
                Join(roomInfo, roomInfo.roomNumber, guildId, videoId, learningRecordId)
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



export default JoinRoom;