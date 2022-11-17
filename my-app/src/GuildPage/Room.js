import React, { useEffect } from 'react';
import { exitRoom } from './GuildPage';
import VideoContainer from './VideoContainer';
import { getLocalPreviewAndInitRoomConnection } from './GuildPage';
import { createRoom, joinRoom } from './GuildPage'; 

const Room = ({ roomInfo, guildId, videoId, learningRecordId, onClickRoomModal }) => {
    const test = async() => {
        const a = await getLocalPreviewAndInitRoomConnection();
        console.log("AAAAAAAAAAAAAAAAAAA", a)
        JoinRoomhandler(roomInfo, roomInfo.roomNumber, guildId, videoId, learningRecordId);
    }
    useEffect(() => {
        test()

        return () => {
            exitRoom();
        }
    }, []);
    return (
        <div>
            <VideoContainer/>
            <p>{roomInfo.roomNumber}</p>
            <p>{roomInfo.videoId}</p>
            <p>{ JSON.stringify(roomInfo) }</p>  
            <button onClick={() => {
                onClickRoomModal()
                exitRoom()
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

export default Room;