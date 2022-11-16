import React, { useEffect } from 'react';
import { createRoom, joinRoom, exitRoom } from './GuildPage';

const videoId = "asoiharas"
const learningRecordId = "254"

const GuildRoomInfo = (props) => {
    const { guildInfo, roomNumber } = props

    let roomInfo = guildInfo.rooms[roomNumber-1];

    return (
        <div>
            {roomInfo &&
                <div>
                    <p>videoId: {roomInfo.videoId}</p>  
                    <p>{roomInfo.roomNumber}</p>
                    <p>현재 접속한 사람들</p>  
                    <p>{ JSON.stringify(roomInfo) }</p>  
                    <button onClick={ () => JoinRoomhandler(roomInfo, roomNumber, guildInfo.guildId, videoId, learningRecordId) }>입장하기</button>
                </div>
            }
            <button onClick={ () => exitRoom() }>나가기</button>
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

export default GuildRoomInfo;